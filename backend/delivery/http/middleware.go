package http

import (
	"context"
	"net/http"
	"strings"

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
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://127.0.0.1:5173")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}
func SubscriptionMiddleware(
	subUsecase *usecase.SubscriptionUsecase,
	usageUsecase *usecase.UsageUsecase,
) func(http.Handler) http.Handler {

	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

			userID, ok := r.Context().Value("userID").(int64)
			if !ok {
				http.Error(w, "unauthorized", http.StatusUnauthorized)
				return
			}

			sub, err := subUsecase.GetByUserID(userID)
			if err != nil {
				http.Error(w, "subscription not found", http.StatusForbidden)
				return
			}

			// 🔥 QUOTA CHECK
			if sub.QuotaUsed >= sub.QuotaLimit {
				http.Error(w, "quota exceeded", http.StatusTooManyRequests)
				return
			}

			// 🔥 RATE LIMIT (ง่าย ๆ version)
			// TODO: สามารถ optimize เป็น sliding window ได้
			if sub.RateLimitPerMin <= 0 {
				http.Error(w, "rate limit exceeded", http.StatusTooManyRequests)
				return
			}

			// ผ่าน → ไป handler
			next.ServeHTTP(w, r)

			// 🔥 หลัง request → บันทึก usage
			subUsecase.IncrementUsage(userID)
			usageUsecase.Log(userID, r.URL.Path)
		})
	}
}
func QuotaMiddleware(subUsecase *usecase.SubscriptionUsecase) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

			// ดึง userID จาก JWT context
			userID, ok := r.Context().Value("userID").(int64)
			if !ok {
				http.Error(w, "unauthorized", http.StatusUnauthorized)
				return
			}

			sub, err := subUsecase.GetByUserID(userID)
			if err != nil {
				http.Error(w, "subscription not found", 403)
				return
			}

			// 🚨 check quota
			if sub.Plan != "gold" && sub.QuotaUsed >= sub.QuotaLimit {
				http.Error(w, "quota exceeded", 429)
				return
			}

			// ✅ เพิ่ม usage
			_ = subUsecase.IncrementUsage(userID)

			next.ServeHTTP(w, r)
		})
	}
}