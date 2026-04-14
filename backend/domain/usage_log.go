package domain

type UsageLog struct {
	ID        int64
	UserID    int64
	Endpoint  string
	Method    string
	CreatedAt string
}