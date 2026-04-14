package sqlite

import (
	"database/sql"

	"project-wsmst-backend/domain"
)

type SubscriptionRepository struct {
	db *sql.DB
}

func NewSubscriptionRepository(db *sql.DB) *SubscriptionRepository {
	return &SubscriptionRepository{db: db}
}

func (r *SubscriptionRepository) Create(sub domain.Subscription) (domain.Subscription, error) {
	res, err := r.db.Exec(`
		INSERT INTO subscriptions (user_id, plan, quota_limit, quota_used, rate_limit_per_min)
		VALUES (?, ?, ?, ?, ?)
	`, sub.UserID, sub.Plan, sub.QuotaLimit, sub.QuotaUsed, sub.RateLimitPerMin)
	if err != nil {
		return sub, err
	}

	id, err := res.LastInsertId()
	if err != nil {
		return sub, err
	}

	sub.ID = id
	return sub, nil
}

func (r *SubscriptionRepository) GetByUserID(userID int64) (domain.Subscription, error) {
	var sub domain.Subscription

	err := r.db.QueryRow(`
		SELECT id, user_id, plan, quota_limit, quota_used, rate_limit_per_min
		FROM subscriptions
		WHERE user_id = ?
	`, userID).Scan(
		&sub.ID,
		&sub.UserID,
		&sub.Plan,
		&sub.QuotaLimit,
		&sub.QuotaUsed,
		&sub.RateLimitPerMin,
	)

	return sub, err
}

func (r *SubscriptionRepository) Update(sub domain.Subscription) error {
	_, err := r.db.Exec(`
		UPDATE subscriptions
		SET plan = ?, quota_limit = ?, quota_used = ?, rate_limit_per_min = ?
		WHERE id = ?
	`, sub.Plan, sub.QuotaLimit, sub.QuotaUsed, sub.RateLimitPerMin, sub.ID)

	return err
}