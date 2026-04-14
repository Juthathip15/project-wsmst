package http

import (
	"encoding/json"
	"net/http"
	"strconv"

	"project-wsmst-backend/domain"
	"project-wsmst-backend/usecase"
)

type ServiceHandler struct {
	usecase *usecase.ServiceUsecase
}

func NewServiceHandler(u *usecase.ServiceUsecase) *ServiceHandler {
	return &ServiceHandler{usecase: u}
}

func (h *ServiceHandler) List(w http.ResponseWriter, r *http.Request) {
	data, _ := h.usecase.GetAll()
	json.NewEncoder(w).Encode(data)
}

func (h *ServiceHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	idStr := r.URL.Path[len("/api/v1/services/"):]
	id, _ := strconv.Atoi(idStr)

	data, err := h.usecase.GetByID(int64(id))
	if err != nil {
		http.Error(w, "not found", 404)
		return
	}

	json.NewEncoder(w).Encode(data)
}

func (h *ServiceHandler) Create(w http.ResponseWriter, r *http.Request) {
	var input domain.Service
	json.NewDecoder(r.Body).Decode(&input)

	service, err := h.usecase.Create(input)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}

	json.NewEncoder(w).Encode(service)
}

func (h *ServiceHandler) Search(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query().Get("q")

	data, _ := h.usecase.Search(q)
	json.NewEncoder(w).Encode(data)
}