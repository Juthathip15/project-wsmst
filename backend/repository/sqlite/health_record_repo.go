package sqlite

import (
	"database/sql"

	"project-wsmst-backend/domain"
)

type HealthRecordRepository struct {
	db *sql.DB
}

func NewHealthRecordRepository(db *sql.DB) *HealthRecordRepository {
	return &HealthRecordRepository{db: db}
}

func (r *HealthRecordRepository) Create(record domain.HealthRecord) (domain.HealthRecord, error) {
	tx, err := r.db.Begin()
	if err != nil {
		return domain.HealthRecord{}, err
	}
	defer tx.Rollback()

	result, err := tx.Exec(
		`INSERT INTO health_records (patient_id, record_date, note) VALUES (?, ?, ?)`,
		record.PatientID, record.RecordDate, record.Note,
	)
	if err != nil {
		return domain.HealthRecord{}, err
	}

	recordID, err := result.LastInsertId()
	if err != nil {
		return domain.HealthRecord{}, err
	}
	record.ID = recordID

	for _, item := range record.Items {
		_, err := tx.Exec(
			`INSERT INTO health_record_items (health_record_id, item_type, value, unit, status) VALUES (?, ?, ?, ?, ?)`,
			recordID, item.ItemType, item.Value, item.Unit, item.Status,
		)
		if err != nil {
			return domain.HealthRecord{}, err
		}
	}

	if err := tx.Commit(); err != nil {
		return domain.HealthRecord{}, err
	}

	return record, nil
}

func (r *HealthRecordRepository) ListByPatientID(patientID int64) ([]domain.HealthRecord, error) {
	rows, err := r.db.Query(
		`SELECT id, patient_id, record_date, note FROM health_records WHERE patient_id = ? ORDER BY id DESC`,
		patientID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var records []domain.HealthRecord
	for rows.Next() {
		var rec domain.HealthRecord
		if err := rows.Scan(&rec.ID, &rec.PatientID, &rec.RecordDate, &rec.Note); err != nil {
			return nil, err
		}

		itemRows, err := r.db.Query(
			`SELECT id, item_type, value, unit, status FROM health_record_items WHERE health_record_id = ?`,
			rec.ID,
		)
		if err != nil {
			return nil, err
		}

		var items []domain.HealthRecordItem
		for itemRows.Next() {
			var item domain.HealthRecordItem
			if err := itemRows.Scan(&item.ID, &item.ItemType, &item.Value, &item.Unit, &item.Status); err != nil {
				itemRows.Close()
				return nil, err
			}
			items = append(items, item)
		}
		itemRows.Close()

		rec.Items = items
		records = append(records, rec)
	}

	return records, nil
}