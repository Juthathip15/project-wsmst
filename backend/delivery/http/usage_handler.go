package http

import (
	"encoding/json"
	"net/http"
)

type UsageHandler struct{}

func NewUsageHandler() *UsageHandler {
	return &UsageHandler{}
}

func (h *UsageHandler) GetUsage(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(map[string]any{
		"message": "usage endpoint ready",
		"data":    []any{},
	})
}