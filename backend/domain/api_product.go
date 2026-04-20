package domain

type APIProduct struct {
	ID             int64  `json:"id"`
	Slug           string `json:"slug"`
	Name           string `json:"name"`
	Category       string `json:"category"`
	Description    string `json:"description"`
	TargetUsers    string `json:"targetUsers"`
	AvailablePlans string `json:"availablePlans"`
	Method         string `json:"method"`
	Endpoint       string `json:"endpoint"`
	Status         string `json:"status"`
	SampleRequest  string `json:"sampleRequest"`
	SampleResponse string `json:"sampleResponse"`
}