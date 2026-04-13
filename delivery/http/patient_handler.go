package http

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"project-wsmst-backend/delivery/http/dto"
	"project-wsmst-backend/usecase"
)

type PatientHandler struct {
	patientUsecase *usecase.PatientUsecase
}

func NewPatientHandler(patientUsecase *usecase.PatientUsecase) *PatientHandler {
	return &PatientHandler{patientUsecase: patientUsecase}
}

func (h *PatientHandler) Create(w http.ResponseWriter, r *http.Request) {
	var req dto.CreatePatientRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	if req.FullName == "" || req.Gender == "" || req.Age <= 0 || req.Province == "" || req.Lifestyle == "" {
		http.Error(w, "fullName, gender, age, province, lifestyle are required", http.StatusBadRequest)
		return
	}

	patient, err := h.patientUsecase.Create(req.FullName, req.Gender, req.Age, req.Province, req.Lifestyle)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	resp := dto.PatientResponse{
		ID:        patient.ID,
		FullName:  patient.FullName,
		Gender:    patient.Gender,
		Age:       patient.Age,
		Province:  patient.Province,
		Lifestyle: patient.Lifestyle,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

func (h *PatientHandler) List(w http.ResponseWriter, r *http.Request) {
	patients, err := h.patientUsecase.List()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var resp []dto.PatientResponse
	for _, p := range patients {
		resp = append(resp, dto.PatientResponse{
			ID:        p.ID,
			FullName:  p.FullName,
			Gender:    p.Gender,
			Age:       p.Age,
			Province:  p.Province,
			Lifestyle: p.Lifestyle,
		})
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

func (h *PatientHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	idStr := strings.TrimPrefix(r.URL.Path, "/api/patients/")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		http.Error(w, "invalid patient id", http.StatusBadRequest)
		return
	}

	patient, err := h.patientUsecase.GetByID(id)
	if err != nil {
		http.Error(w, "patient not found", http.StatusNotFound)
		return
	}

	resp := dto.PatientResponse{
		ID:        patient.ID,
		FullName:  patient.FullName,
		Gender:    patient.Gender,
		Age:       patient.Age,
		Province:  patient.Province,
		Lifestyle: patient.Lifestyle,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}