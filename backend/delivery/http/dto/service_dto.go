package dto

type CreateServiceRequest struct {
	Name        string  `json:"name"`
	Description string  `json:"description"`
	CategoryID  int64   `json:"categoryId"`
	Price       float64 `json:"price"`
	Provider    string  `json:"provider"`
}

type ServiceResponse struct {
	ID          int64   `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	CategoryID  int64   `json:"categoryId"`
	Price       float64 `json:"price"`
	Provider    string  `json:"provider"`
}