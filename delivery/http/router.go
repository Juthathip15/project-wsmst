package http

import "net/http"

func NewRouter(
	authHandler *AuthHandler,
	patientHandler *PatientHandler,
	recordHandler *HealthRecordHandler,
) http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/api/register", authHandler.Register)
	mux.HandleFunc("/api/login", authHandler.Login)
	mux.Handle("/api/profile", AuthMiddleware(http.HandlerFunc(authHandler.Profile)))

	mux.Handle("/api/patients", AuthMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			patientHandler.List(w, r)
		case http.MethodPost:
			patientHandler.Create(w, r)
		default:
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		}
	})))

	mux.Handle("/api/patients/", AuthMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet && len(r.URL.Path) > len("/api/patients/") {
			if hasHistoryPath(r.URL.Path) {
				recordHandler.ListByPatientID(w, r)
				return
			}
			patientHandler.GetByID(w, r)
			return
		}
		http.NotFound(w, r)
	})))

	mux.Handle("/api/health-records", AuthMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			recordHandler.Create(w, r)
			return
		}
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
	})))

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("API is running"))
	})

	return mux
}

func hasHistoryPath(path string) bool {
	return len(path) > 0 && path[len(path)-8:] == "/history"
}