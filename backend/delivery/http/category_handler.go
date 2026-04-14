package http

import (
	"encoding/json"
	"net/http"
	"project-wsmst-backend/usecase"
)

type CategoryHandler struct {
	usecase *usecase.CategoryUsecase
}

func NewCategoryHandler(u *usecase.CategoryUsecase) *CategoryHandler {
	return &CategoryHandler{usecase: u}
}

func (h *CategoryHandler) GetAll(w http.ResponseWriter, r *http.Request) {
	data, _ := h.usecase.GetAll()
	json.NewEncoder(w).Encode(data)
}