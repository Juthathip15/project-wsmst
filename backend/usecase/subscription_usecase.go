package usecase

import "project-wsmst-backend/domain"

type SubscriptionUsecase struct {
	repo     domain.SubscriptionRepository
	userRepo domain.UserRepository
}

func NewSubscriptionUsecase(
	r domain.SubscriptionRepository,
	userRepo domain.UserRepository,
) *SubscriptionUsecase {
	return &SubscriptionUsecase{
		repo:     r,
		userRepo: userRepo,
	}
}

func (u *SubscriptionUsecase) GetByUserID(userID int64) (domain.Subscription, error) {
	return u.repo.GetByUserID(userID)
}

func (u *SubscriptionUsecase) IncrementUsage(userID int64) error {
	sub, err := u.repo.GetByUserID(userID)
	if err != nil {
		return err
	}

	sub.QuotaUsed++
	return u.repo.Update(sub)
}

func (u *SubscriptionUsecase) CreateOrUpdate(userID int64, plan string) domain.Subscription {
	config := GetPlanConfig(plan)

	sub, err := u.repo.GetByUserID(userID)
	if err != nil {
		newSub := domain.Subscription{
			UserID:          userID,
			Plan:            plan,
			QuotaLimit:      config.QuotaLimit,
			QuotaUsed:       0,
			RateLimitPerMin: config.RateLimitPerMin,
		}

		res, _ := u.repo.Create(newSub)

		user, userErr := u.userRepo.GetByID(userID)
		if userErr == nil {
			_ = u.userRepo.UpdateRoleAndPlan(userID, user.Role, plan)
		}

		return res
	}

	sub.Plan = plan
	sub.QuotaLimit = config.QuotaLimit
	sub.RateLimitPerMin = config.RateLimitPerMin
	sub.QuotaUsed = 0

	_ = u.repo.Update(sub)

	user, userErr := u.userRepo.GetByID(userID)
	if userErr == nil {
		_ = u.userRepo.UpdateRoleAndPlan(userID, user.Role, plan)
	}

	return sub
}