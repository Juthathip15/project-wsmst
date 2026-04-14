package usecase

type PlanConfig struct {
	QuotaLimit      int
	RateLimitPerMin int
}

func GetPlanConfig(plan string) PlanConfig {
	switch plan {
	case "silver":
		return PlanConfig{
			QuotaLimit:      50000,
			RateLimitPerMin: 100,
		}
	case "gold":
		return PlanConfig{
			QuotaLimit:      999999999,
			RateLimitPerMin: 1000,
		}
	default:
		return PlanConfig{
			QuotaLimit:      1000,
			RateLimitPerMin: 10,
		}
	}
}