package sqlite

import (
	"database/sql"
	"errors"

	"project-wsmst-backend/domain"
)

type UserRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) Create(user domain.User) (domain.User, error) {
	result, err := r.db.Exec(
		`INSERT INTO users (full_name, email, password_hash, role, plan) VALUES (?, ?, ?, ?, ?)`,
		user.FullName, user.Email, user.PasswordHash, user.Role, user.Plan,
	)
	if err != nil {
		return domain.User{}, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return domain.User{}, err
	}

	user.ID = id
	return user, nil
}

func (r *UserRepository) GetByEmail(email string) (domain.User, error) {
	var user domain.User

	err := r.db.QueryRow(
		`SELECT id, full_name, email, password_hash, role, plan FROM users WHERE email = ?`,
		email,
	).Scan(&user.ID, &user.FullName, &user.Email, &user.PasswordHash, &user.Role, &user.Plan)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return domain.User{}, sql.ErrNoRows
		}
		return domain.User{}, err
	}

	return user, nil
}

func (r *UserRepository) GetByID(id int64) (domain.User, error) {
	var user domain.User

	err := r.db.QueryRow(
		`SELECT id, full_name, email, password_hash, role, plan FROM users WHERE id = ?`,
		id,
	).Scan(&user.ID, &user.FullName, &user.Email, &user.PasswordHash, &user.Role, &user.Plan)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return domain.User{}, sql.ErrNoRows
		}
		return domain.User{}, err
	}

	return user, nil
}