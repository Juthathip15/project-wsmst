package http

import (
	nethttp "net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"project-wsmst-backend/usecase"
)

func NewRouter(
	authHandler *AuthHandler,
	patientHandler *PatientHandler,
	recordHandler *HealthRecordHandler,
	serviceHandler *ServiceHandler,
	usageHandler *UsageHandler,
	subscriptionHandler *SubscriptionHandler,
	subUsecase *usecase.SubscriptionUsecase,
	usageUsecase *usecase.UsageUsecase,
) nethttp.Handler {
	r := chi.NewRouter()

	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.StripSlashes)

	r.Get("/health", func(w nethttp.ResponseWriter, r *nethttp.Request) {
		w.WriteHeader(nethttp.StatusOK)
		w.Write([]byte("ok"))
	})

	r.Route("/api/v1", func(r chi.Router) {
		r.Post("/register", authHandler.Register)
		r.Post("/login", authHandler.Login)

		r.Group(func(r chi.Router) {
			r.Use(AuthMiddleware)

			r.Get("/profile", authHandler.Profile)

			r.Post("/patients", patientHandler.Create)
			r.Get("/patients", patientHandler.List)
			r.Get("/patients/{id}", patientHandler.GetByID)

			r.Post("/health-records", recordHandler.Create)
			r.Get("/patients/{id}/history", recordHandler.ListByPatientID)

			r.Get("/usage", usageHandler.GetUsage)
			r.Post("/subscriptions", subscriptionHandler.Create)

			r.Route("/services", func(r chi.Router) {
				r.Use(
					RateLimitMiddleware(subUsecase),
					QuotaMiddleware(subUsecase, usageUsecase),
				)

				r.Get("", serviceHandler.List)
				r.Get("/search", serviceHandler.Search)
				r.Get("/{id}", serviceHandler.GetByID)
			})
		})
	})

	return r
}