package usecase

import "project-wsmst-backend/domain"

type HealthRecordUsecase struct {
	recordRepo  domain.HealthRecordRepository
	patientRepo domain.PatientRepository
}

func NewHealthRecordUsecase(recordRepo domain.HealthRecordRepository, patientRepo domain.PatientRepository) *HealthRecordUsecase {
	return &HealthRecordUsecase{
		recordRepo:  recordRepo,
		patientRepo: patientRepo,
	}
}

func (u *HealthRecordUsecase) Create(patientID int64, recordDate, note string, items []domain.HealthRecordItem) (domain.HealthRecord, error) {
	_, err := u.patientRepo.GetByID(patientID)
	if err != nil {
		return domain.HealthRecord{}, err
	}

	record := domain.HealthRecord{
		PatientID:  patientID,
		RecordDate: recordDate,
		Note:       note,
		Items:      items,
	}

	return u.recordRepo.Create(record)
}

func (u *HealthRecordUsecase) ListByPatientID(patientID int64) ([]domain.HealthRecord, error) {
	_, err := u.patientRepo.GetByID(patientID)
	if err != nil {
		return nil, err
	}

	return u.recordRepo.ListByPatientID(patientID)
}