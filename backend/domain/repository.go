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

type ServiceRepository interface {
	List() ([]Service, error)
	GetByID(id int64) (Service, error)
	Search(q, category string, minPrice, maxPrice float64, sort string, page, limit int) ([]Service, error)
	Create(service Service) (Service, error)
}
type CategoryRepository interface {
	GetAll() ([]Category, error)
}

type SubscriptionRepository interface {
	Create(sub Subscription) (Subscription, error)
	GetByUserID(userID int64) (Subscription, error)
	Update(sub Subscription) error
}

type UsageRepository interface {
	Create(log UsageLog) error
	CountByUserID(userID int64) (int, error)
}