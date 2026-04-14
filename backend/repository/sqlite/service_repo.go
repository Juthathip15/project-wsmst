package sqlite

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"

	"project-wsmst-backend/domain"
)

type ServiceRepository struct {
	db *sql.DB
}

func NewServiceRepository(db *sql.DB) *ServiceRepository {
	return &ServiceRepository{db: db}
}

func (r *ServiceRepository) List() ([]domain.Service, error) {
	rows, err := r.db.Query(`
		SELECT id, name, description, category_id, price, provider
		FROM services
		ORDER BY id DESC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var services []domain.Service
	for rows.Next() {
		var s domain.Service
		if err := rows.Scan(
			&s.ID,
			&s.Name,
			&s.Description,
			&s.CategoryID,
			&s.Price,
			&s.Provider,
		); err != nil {
			return nil, err
		}
		services = append(services, s)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return services, nil
}

func (r *ServiceRepository) GetByID(id int64) (domain.Service, error) {
	var s domain.Service

	err := r.db.QueryRow(`
		SELECT id, name, description, category_id, price, provider
		FROM services
		WHERE id = ?
	`, id).Scan(
		&s.ID,
		&s.Name,
		&s.Description,
		&s.CategoryID,
		&s.Price,
		&s.Provider,
	)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return domain.Service{}, sql.ErrNoRows
		}
		return domain.Service{}, err
	}

	return s, nil
}

func (r *ServiceRepository) Create(service domain.Service) (domain.Service, error) {
	result, err := r.db.Exec(`
		INSERT INTO services (name, description, category_id, price, provider)
		VALUES (?, ?, ?, ?, ?)
	`,
		service.Name,
		service.Description,
		service.CategoryID,
		service.Price,
		service.Provider,
	)
	if err != nil {
		return domain.Service{}, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return domain.Service{}, err
	}

	service.ID = id
	return service, nil
}

func (r *ServiceRepository) Search(q, category string, minPrice, maxPrice float64, sort string, page, limit int) ([]domain.Service, error) {
	if page <= 0 {
		page = 1
	}
	if limit <= 0 {
		limit = 10
	}
	offset := (page - 1) * limit

	baseQuery := `
		SELECT s.id, s.name, s.description, s.category_id, s.price, s.provider
		FROM services s
		LEFT JOIN categories c ON s.category_id = c.id
		WHERE 1=1
	`

	var conditions []string
	var args []any

	if strings.TrimSpace(q) != "" {
		conditions = append(conditions, `(s.name LIKE ? OR s.description LIKE ? OR s.provider LIKE ?)`)
		likeQ := "%" + q + "%"
		args = append(args, likeQ, likeQ, likeQ)
	}

	if strings.TrimSpace(category) != "" {
		conditions = append(conditions, `c.name = ?`)
		args = append(args, category)
	}

	if minPrice > 0 {
		conditions = append(conditions, `s.price >= ?`)
		args = append(args, minPrice)
	}

	if maxPrice > 0 {
		conditions = append(conditions, `s.price <= ?`)
		args = append(args, maxPrice)
	}

	if len(conditions) > 0 {
		baseQuery += " AND " + strings.Join(conditions, " AND ")
	}

	switch sort {
	case "price_asc":
		baseQuery += " ORDER BY s.price ASC"
	case "price_desc":
		baseQuery += " ORDER BY s.price DESC"
	default:
		baseQuery += " ORDER BY s.id DESC"
	}

	baseQuery += " LIMIT ? OFFSET ?"
	args = append(args, limit, offset)

	rows, err := r.db.Query(baseQuery, args...)
	if err != nil {
		return nil, fmt.Errorf("search services query failed: %w", err)
	}
	defer rows.Close()

	var services []domain.Service
	for rows.Next() {
		var s domain.Service
		if err := rows.Scan(
			&s.ID,
			&s.Name,
			&s.Description,
			&s.CategoryID,
			&s.Price,
			&s.Provider,
		); err != nil {
			return nil, err
		}
		services = append(services, s)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return services, nil
}