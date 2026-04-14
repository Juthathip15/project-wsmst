package usecase

import "project-wsmst-backend/domain"

type ServiceUsecase struct {
	repo domain.ServiceRepository
}

func NewServiceUsecase(r domain.ServiceRepository) *ServiceUsecase {
	return &ServiceUsecase{repo: r}
}

func (u *ServiceUsecase) GetAll() ([]domain.Service, error) {
	return u.repo.List()
}

func (u *ServiceUsecase) GetByID(id int64) (domain.Service, error) {
	return u.repo.GetByID(id)
}

func (u *ServiceUsecase) Create(service domain.Service) (domain.Service, error) {
	return u.repo.Create(service)
}

func (u *ServiceUsecase) Search(q string) ([]domain.Service, error) {
	return u.repo.Search(q, "", 0, 999999, "", 1, 10)
}