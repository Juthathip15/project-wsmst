package usecase

import "project-wsmst-backend/domain"

type UsageUsecase struct {
	repo domain.UsageRepository
}

func NewUsageUsecase(r domain.UsageRepository) *UsageUsecase {
	return &UsageUsecase{repo: r}
}

func (u *UsageUsecase) Log(userID int64, endpoint string) {
	u.repo.Create(domain.UsageLog{
		UserID:  userID,
		Endpoint: endpoint,
	})
}