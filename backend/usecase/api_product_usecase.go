package usecase

import "project-wsmst-backend/domain"

type APIProductUsecase struct {
	repo domain.APIProductRepository
}

func NewAPIProductUsecase(r domain.APIProductRepository) *APIProductUsecase {
	return &APIProductUsecase{repo: r}
}

func (u *APIProductUsecase) List() ([]domain.APIProduct, error) {
	return u.repo.List()
}

func (u *APIProductUsecase) GetBySlug(slug string) (domain.APIProduct, error) {
	return u.repo.GetBySlug(slug)
}