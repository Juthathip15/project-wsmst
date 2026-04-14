package domain

type Subscription struct {
	ID              int64
	UserID          int64
	Plan            string
	QuotaLimit      int
	QuotaUsed       int
	RateLimitPerMin int
}