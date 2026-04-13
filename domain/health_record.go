package domain

type HealthRecordItem struct {
	ID        int64
	ItemType  string
	Value     float64
	Unit      string
	Status    string
}

type HealthRecord struct {
	ID         int64
	PatientID  int64
	RecordDate string
	Note       string
	Items      []HealthRecordItem
}