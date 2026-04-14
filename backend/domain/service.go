package domain

type Service struct {
	ID          int64
	Name        string
	Description string
	CategoryID  int64
	Price       float64
	Provider    string
}