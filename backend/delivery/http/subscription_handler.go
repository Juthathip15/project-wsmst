package http

import (
	"encoding/json"
	"net/http"

	"project-wsmst-backend/usecase"
)

type SubscriptionHandler struct {
	usecase *usecase.SubscriptionUsecase
}

func NewSubscriptionHandler(u *usecase.SubscriptionUsecase) *SubscriptionHandler {
	return &SubscriptionHandler{usecase: u}
}

type request struct {
	Plan string `json:"plan"`
}

func (h *SubscriptionHandler) Create(w http.ResponseWriter, r *http.Request) {
	var req request
	_ = json.NewDecoder(r.Body).Decode(&req)

	userID := r.Context().Value(UserIDContextKey).(int64)

	sub := h.usecase.CreateOrUpdate(userID, req.Plan)

	json.NewEncoder(w).Encode(map[string]any{
		"message": "subscription updated",
		"data":    sub,
	})
}