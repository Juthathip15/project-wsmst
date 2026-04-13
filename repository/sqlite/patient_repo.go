package sqlite

import (
	"database/sql"
	"errors"

	"project-wsmst-backend/domain"
)

type PatientRepository struct {
	db *sql.DB
}

func NewPatientRepository(db *sql.DB) *PatientRepository {
	return &PatientRepository{db: db}
}

func (r *PatientRepository) Create(patient domain.Patient) (domain.Patient, error) {
	result, err := r.db.Exec(
		`INSERT INTO patients (full_name, gender, age, province, lifestyle) VALUES (?, ?, ?, ?, ?)`,
		patient.FullName, patient.Gender, patient.Age, patient.Province, patient.Lifestyle,
	)
	if err != nil {
		return domain.Patient{}, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return domain.Patient{}, err
	}

	patient.ID = id
	return patient, nil
}

func (r *PatientRepository) GetByID(id int64) (domain.Patient, error) {
	var patient domain.Patient

	err := r.db.QueryRow(
		`SELECT id, full_name, gender, age, province, lifestyle FROM patients WHERE id = ?`,
		id,
	).Scan(
		&patient.ID,
		&patient.FullName,
		&patient.Gender,
		&patient.Age,
		&patient.Province,
		&patient.Lifestyle,
	)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return domain.Patient{}, sql.ErrNoRows
		}
		return domain.Patient{}, err
	}

	return patient, nil
}

func (r *PatientRepository) List() ([]domain.Patient, error) {
	rows, err := r.db.Query(`SELECT id, full_name, gender, age, province, lifestyle FROM patients ORDER BY id DESC`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var patients []domain.Patient
	for rows.Next() {
		var p domain.Patient
		if err := rows.Scan(&p.ID, &p.FullName, &p.Gender, &p.Age, &p.Province, &p.Lifestyle); err != nil {
			return nil, err
		}
		patients = append(patients, p)
	}

	return patients, nil
}