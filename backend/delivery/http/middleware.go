package http

import (
	"context"
	"net/http"
	"strings"
	"sync"
	"time"

	internalauth "project-wsmst-backend/internal/auth"
	"project-wsmst-backend/usecase"
)

type contextKey string

const UserIDContextKey contextKey = "userID"

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "missing authorization header", http.StatusUnauthorized)
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			http.Error(w, "invalid authorization header", http.StatusUnauthorized)
			return
		}

		claims, err := internalauth.ParseToken(parts[1])
		if err != nil {
			http.Error(w, "invalid token", http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), UserIDContextKey, claims.UserID)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func CORSMiddleware(next http.Handler) http.Handler {
	allowedOrigins := map[string]bool{
		"http://127.0.0.1:5173": true,
		"http://localhost:5173": true,
	}

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		if allowedOrigins[origin] {
			w.Header().Set("Access-Control-Allow-Origin", origin)
		}

		w.Header().Set("Vary", "Origin")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func QuotaMiddleware(
	subUsecase *usecase.SubscriptionUsecase,
	usageUsecase *usecase.UsageUsecase,
) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			userID, ok := r.Context().Value(UserIDContextKey).(int64)
			if !ok {
				http.Error(w, "unauthorized", http.StatusUnauthorized)
				return
			}

			sub, err := subUsecase.GetByUserID(userID)
			if err != nil {
				http.Error(w, "subscription not found", http.StatusForbidden)
				return
			}

			summary, err := usageUsecase.GetSummary(userID)
			if err != nil {
				http.Error(w, "failed to check usage", http.StatusInternalServerError)
				return
			}

			if sub.Plan != "gold" && summary.QuotaUsed >= sub.QuotaLimit {
				http.Error(w, "quota exceeded", http.StatusTooManyRequests)
				return
			}

			next.ServeHTTP(w, r)

			if err := usageUsecase.Log(userID, r.URL.Path, r.Method); err != nil {
				println("usage log failed:", err.Error())
			}
		})
	}
}

type userRateWindow struct {
	WindowStart time.Time
	Count       int
}

var (
	rateLimitStore = map[int64]*userRateWindow{}
	rateLimitMu    sync.Mutex
)

func RateLimitMiddleware(
	subUsecase *usecase.SubscriptionUsecase,
) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			userID, ok := r.Context().Value(UserIDContextKey).(int64)
			if !ok {
				http.Error(w, "unauthorized", http.StatusUnauthorized)
				return
			}

			sub, err := subUsecase.GetByUserID(userID)
			if err != nil {
				http.Error(w, "subscription not found", http.StatusForbidden)
				return
			}

			limit := sub.RateLimitPerMin
			if limit <= 0 {
				http.Error(w, "rate limit not configured", http.StatusTooManyRequests)
				return
			}

			now := time.Now()

			rateLimitMu.Lock()
			defer rateLimitMu.Unlock()

			window, exists := rateLimitStore[userID]
			if !exists {
				rateLimitStore[userID] = &userRateWindow{
					WindowStart: now,
					Count:       1,
				}
				next.ServeHTTP(w, r)
				return
			}

			if now.Sub(window.WindowStart) >= time.Minute {
				window.WindowStart = now
				window.Count = 1
				next.ServeHTTP(w, r)
				return
			}

			if window.Count >= limit {
				http.Error(w, "rate limit exceeded", http.StatusTooManyRequests)
				return
			}

			window.Count++
			next.ServeHTTP(w, r)
		})
	}
}