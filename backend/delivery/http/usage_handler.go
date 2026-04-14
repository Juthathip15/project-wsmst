package http

import (
	"encoding/json"
	"log"
	"net/http"

	"project-wsmst-backend/usecase"
)

type UsageHandler struct {
	usecase *usecase.UsageUsecase
}

func NewUsageHandler(u *usecase.UsageUsecase) *UsageHandler {
	return &UsageHandler{usecase: u}
}

func (h *UsageHandler) GetUsage(w http.ResponseWriter, r *http.Request) {
	userID, ok := r.Context().Value(UserIDContextKey).(int64)
	if !ok {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	data, err := h.usecase.GetSummary(userID)
	if err != nil {
		log.Printf("GetUsage failed: userID=%d err=%v", userID, err)
		http.Error(w, "failed to get usage", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}
