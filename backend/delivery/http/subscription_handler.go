package http

import (
	"encoding/json"
	"net/http"
)

type SubscriptionHandler struct{}

func NewSubscriptionHandler() *SubscriptionHandler {
	return &SubscriptionHandler{}
}

func (h *SubscriptionHandler) GetMySubscription(w http.ResponseWriter, r *http.Request) {
	// mock response ก่อน
	json.NewEncoder(w).Encode(map[string]string{
		"plan": "basic",
	})
}