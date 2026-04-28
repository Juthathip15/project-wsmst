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
	).Scan(
		&user.ID,
		&user.FullName,
		&user.Email,
		&user.PasswordHash,
		&user.Role,
		&user.Plan,
	)

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
	).Scan(
		&user.ID,
		&user.FullName,
		&user.Email,
		&user.PasswordHash,
		&user.Role,
		&user.Plan,
	)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return domain.User{}, sql.ErrNoRows
		}
		return domain.User{}, err
	}

	return user, nil
}

func (r *UserRepository) GetAll() ([]domain.User, error) {
	rows, err := r.db.Query(
		`SELECT id, full_name, email, password_hash, role, plan FROM users`,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []domain.User

	for rows.Next() {
		var user domain.User

		err := rows.Scan(
			&user.ID,
			&user.FullName,
			&user.Email,
			&user.PasswordHash,
			&user.Role,
			&user.Plan,
		)
		if err != nil {
			return nil, err
		}

		users = append(users, user)
	}

	return users, nil
}

func (r *UserRepository) UpdateRoleAndPlan(id int64, role string, plan string) error {
	_, err := r.db.Exec(
		`UPDATE users SET role = ?, plan = ? WHERE id = ?`,
		role, plan, id,
	)
	return err
}

func (r *UserRepository) Delete(id int64) error {
	_, err := r.db.Exec(
		`DELETE FROM users WHERE id = ?`,
		id,
	)
	return err
}