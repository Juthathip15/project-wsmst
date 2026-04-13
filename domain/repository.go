package domain

type UserRepository interface {
	Create(user User) (User, error)
	GetByEmail(email string) (User, error)
	GetByID(id int64) (User, error)
}
type PatientRepository interface {
	Create(patient Patient) (Patient, error)
	GetByID(id int64) (Patient, error)
	List() ([]Patient, error)
}

type HealthRecordRepository interface {
	Create(record HealthRecord) (HealthRecord, error)
	ListByPatientID(patientID int64) ([]HealthRecord, error)
}