package usecase

import (
	"database/sql"
	"errors"

	"project-wsmst-backend/domain"
)

type UsageUsecase struct {
	repo    domain.UsageRepository
	subRepo domain.SubscriptionRepository
}

type UsageSummary struct {
	Plan       string `json:"plan"`
	QuotaUsed  int    `json:"quotaUsed"`
	QuotaLimit int    `json:"quotaLimit"`
	Remaining  int    `json:"remaining"`
}

func NewUsageUsecase(
	repo domain.UsageRepository,
	subRepo domain.SubscriptionRepository,
) *UsageUsecase {
	return &UsageUsecase{
		repo:    repo,
		subRepo: subRepo,
	}
}

func (u *UsageUsecase) Log(userID int64, endpoint, method string) error {
	return u.repo.Create(domain.UsageLog{
		UserID:   userID,
		Endpoint: endpoint,
		Method:   method,
	})
}

func (u *UsageUsecase) GetSummary(userID int64) (UsageSummary, error) {
	sub, err := u.subRepo.GetByUserID(userID)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			sub = domain.Subscription{
				UserID:          userID,
				Plan:            "basic",
				QuotaLimit:      1000,
				QuotaUsed:       0,
				RateLimitPerMin: 60,
			}
		} else {
			return UsageSummary{}, err
		}
	}

	used, err := u.repo.CountByUserID(userID)
	if err != nil {
		return UsageSummary{}, err
	}

	remaining := sub.QuotaLimit - used
	if sub.Plan == "gold" {
		remaining = -1
	}
	if remaining < 0 && sub.Plan != "gold" {
		remaining = 0
	}

	return UsageSummary{
		Plan:       sub.Plan,
		QuotaUsed:  used,
		QuotaLimit: sub.QuotaLimit,
		Remaining:  remaining,
	}, nil
}