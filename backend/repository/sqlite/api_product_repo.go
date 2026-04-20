package sqlite

import (
	"database/sql"

	"project-wsmst-backend/domain"
)

type APIProductRepository struct {
	db *sql.DB
}

func NewAPIProductRepository(db *sql.DB) *APIProductRepository {
	return &APIProductRepository{db: db}
}

func (r *APIProductRepository) List() ([]domain.APIProduct, error) {
	rows, err := r.db.Query(`
		SELECT id, slug, name, category, description, target_users, available_plans,
		       method, endpoint, status, sample_request, sample_response
		FROM api_products
		ORDER BY id ASC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var items []domain.APIProduct
	for rows.Next() {
		var item domain.APIProduct
		if err := rows.Scan(
			&item.ID,
			&item.Slug,
			&item.Name,
			&item.Category,
			&item.Description,
			&item.TargetUsers,
			&item.AvailablePlans,
			&item.Method,
			&item.Endpoint,
			&item.Status,
			&item.SampleRequest,
			&item.SampleResponse,
		); err != nil {
			return nil, err
		}
		items = append(items, item)
	}

	return items, nil
}

func (r *APIProductRepository) GetBySlug(slug string) (domain.APIProduct, error) {
	var item domain.APIProduct

	err := r.db.QueryRow(`
		SELECT id, slug, name, category, description, target_users, available_plans,
		       method, endpoint, status, sample_request, sample_response
		FROM api_products
		WHERE slug = ?
	`, slug).Scan(
		&item.ID,
		&item.Slug,
		&item.Name,
		&item.Category,
		&item.Description,
		&item.TargetUsers,
		&item.AvailablePlans,
		&item.Method,
		&item.Endpoint,
		&item.Status,
		&item.SampleRequest,
		&item.SampleResponse,
	)

	return item, err
}