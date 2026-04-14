package usecase

import "project-wsmst-backend/domain"

type PatientUsecase struct {
	patientRepo domain.PatientRepository
}

func NewPatientUsecase(patientRepo domain.PatientRepository) *PatientUsecase {
	return &PatientUsecase{patientRepo: patientRepo}
}

func (u *PatientUsecase) Create(fullName, gender string, age int, province, lifestyle string) (domain.Patient, error) {
	patient := domain.Patient{
		FullName:  fullName,
		Gender:    gender,
		Age:       age,
		Province:  province,
		Lifestyle: lifestyle,
	}
	return u.patientRepo.Create(patient)
}

func (u *PatientUsecase) GetByID(id int64) (domain.Patient, error) {
	return u.patientRepo.GetByID(id)
}

func (u *PatientUsecase) List() ([]domain.Patient, error) {
	return u.patientRepo.List()
}