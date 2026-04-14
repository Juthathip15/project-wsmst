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