package usecase

import "project-wsmst-backend/domain"

type SubscriptionUsecase struct {
	repo domain.SubscriptionRepository
}

func NewSubscriptionUsecase(r domain.SubscriptionRepository) *SubscriptionUsecase {
	return &SubscriptionUsecase{repo: r}
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