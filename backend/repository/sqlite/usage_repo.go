package sqlite

import (
	"database/sql"

	"project-wsmst-backend/domain"
)

type UsageRepository struct {
	db *sql.DB
}

func NewUsageRepository(db *sql.DB) *UsageRepository {
	return &UsageRepository{db: db}
}

func (r *UsageRepository) Create(log domain.UsageLog) error {
	_, err := r.db.Exec(`
		INSERT INTO usage_logs (user_id, endpoint, method)
		VALUES (?, ?, ?)
	`, log.UserID, log.Endpoint, log.Method)

	return err
}

func (r *UsageRepository) CountByUserID(userID int64) (int, error) {
	var count int
	err := r.db.QueryRow(`
		SELECT COUNT(*) FROM usage_logs WHERE user_id = ?
	`, userID).Scan(&count)

	return count, err
}