package dto

type CreatePatientRequest struct {
	FullName  string `json:"fullName"`
	Gender    string `json:"gender"`
	Age       int    `json:"age"`
	Province  string `json:"province"`
	Lifestyle string `json:"lifestyle"`
}

type PatientResponse struct {
	ID        int64  `json:"id"`
	FullName  string `json:"fullName"`
	Gender    string `json:"gender"`
	Age       int    `json:"age"`
	Province  string `json:"province"`
	Lifestyle string `json:"lifestyle"`
}