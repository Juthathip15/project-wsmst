package usecase

type PlanConfig struct {
	Name        string
	Quota       int
	RatePerMin  int
}

var Plans = map[string]PlanConfig{
	"basic": {
		Name:       "basic",
		Quota:      1000,
		RatePerMin: 10,
	},
	"silver": {
		Name:       "silver",
		Quota:      50000,
		RatePerMin: 100,
	},
	"gold": {
		Name:       "gold",
		Quota:      999999999,
		RatePerMin: 1000,
	},
}