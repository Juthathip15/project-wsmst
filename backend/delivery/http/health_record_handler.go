package http

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"project-wsmst-backend/delivery/http/dto"
	"project-wsmst-backend/domain"
	"project-wsmst-backend/usecase"
)

type HealthRecordHandler struct {
	recordUsecase *usecase.HealthRecordUsecase
}

func NewHealthRecordHandler(recordUsecase *usecase.HealthRecordUsecase) *HealthRecordHandler {
	return &HealthRecordHandler{recordUsecase: recordUsecase}
}

func (h *HealthRecordHandler) Create(w http.ResponseWriter, r *http.Request) {
	var req dto.CreateHealthRecordRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	if req.PatientID <= 0 || req.RecordDate == "" || len(req.Items) == 0 {
		http.Error(w, "patientId, recordDate and items are required", http.StatusBadRequest)
		return
	}

	var items []domain.HealthRecordItem
	for _, item := range req.Items {
		items = append(items, domain.HealthRecordItem{
			ItemType: item.ItemType,
			Value:    item.Value,
			Unit:     item.Unit,
			Status:   item.Status,
		})
	}

	record, err := h.recordUsecase.Create(req.PatientID, req.RecordDate, req.Note, items)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var respItems []dto.HealthRecordItemResponse
	for _, item := range record.Items {
		respItems = append(respItems, dto.HealthRecordItemResponse{
			ID:       item.ID,
			ItemType: item.ItemType,
			Value:    item.Value,
			Unit:     item.Unit,
			Status:   item.Status,
		})
	}

	resp := dto.HealthRecordResponse{
		ID:         record.ID,
		PatientID:  record.PatientID,
		RecordDate: record.RecordDate,
		Note:       record.Note,
		Items:      respItems,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

func (h *HealthRecordHandler) ListByPatientID(w http.ResponseWriter, r *http.Request) {
	path := strings.TrimPrefix(r.URL.Path, "/api/patients/")
	parts := strings.Split(path, "/")
	if len(parts) != 2 || parts[1] != "history" {
		http.NotFound(w, r)
		return
	}

	patientID, err := strconv.ParseInt(parts[0], 10, 64)
	if err != nil {
		http.Error(w, "invalid patient id", http.StatusBadRequest)
		return
	}

	records, err := h.recordUsecase.ListByPatientID(patientID)
	if err != nil {
		http.Error(w, "patient not found", http.StatusNotFound)
		return
	}

	var resp []dto.HealthRecordResponse
	for _, rec := range records {
		var items []dto.HealthRecordItemResponse
		for _, item := range rec.Items {
			items = append(items, dto.HealthRecordItemResponse{
				ID:       item.ID,
				ItemType: item.ItemType,
				Value:    item.Value,
				Unit:     item.Unit,
				Status:   item.Status,
			})
		}

		resp = append(resp, dto.HealthRecordResponse{
			ID:         rec.ID,
			PatientID:  rec.PatientID,
			RecordDate: rec.RecordDate,
			Note:       rec.Note,
			Items:      items,
		})
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}