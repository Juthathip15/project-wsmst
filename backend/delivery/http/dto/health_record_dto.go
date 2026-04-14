package dto

type CreateHealthRecordItemRequest struct {
	ItemType string  `json:"itemType"`
	Value    float64 `json:"value"`
	Unit     string  `json:"unit"`
	Status   string  `json:"status"`
}

type CreateHealthRecordRequest struct {
	PatientID  int64                           `json:"patientId"`
	RecordDate string                          `json:"recordDate"`
	Note       string                          `json:"note"`
	Items      []CreateHealthRecordItemRequest `json:"items"`
}

type HealthRecordItemResponse struct {
	ID       int64   `json:"id"`
	ItemType string  `json:"itemType"`
	Value    float64 `json:"value"`
	Unit     string  `json:"unit"`
	Status   string  `json:"status"`
}

type HealthRecordResponse struct {
	ID         int64                      `json:"id"`
	PatientID  int64                      `json:"patientId"`
	RecordDate string                     `json:"recordDate"`
	Note       string                     `json:"note"`
	Items      []HealthRecordItemResponse `json:"items"`
}