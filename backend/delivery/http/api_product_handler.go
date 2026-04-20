package http

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"project-wsmst-backend/usecase"
)

type APIProductHandler struct {
	usecase *usecase.APIProductUsecase
}

func NewAPIProductHandler(u *usecase.APIProductUsecase) *APIProductHandler {
	return &APIProductHandler{usecase: u}
}

func (h *APIProductHandler) List(w http.ResponseWriter, r *http.Request) {
	items, err := h.usecase.List()
	if err != nil {
		http.Error(w, "failed to load api products", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]any{
		"status":  "success",
		"message": "api products loaded",
		"data":    items,
	})
}

func (h *APIProductHandler) GetBySlug(w http.ResponseWriter, r *http.Request) {
	slug := chi.URLParam(r, "slug")

	item, err := h.usecase.GetBySlug(slug)
	if err != nil {
		http.Error(w, "api product not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]any{
		"status":  "success",
		"message": "api product loaded",
		"data":    item,
	})
}