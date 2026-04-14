package usecase

import "project-wsmst-backend/domain"

type CategoryUsecase struct {
	repo domain.CategoryRepository
}

func NewCategoryUsecase(r domain.CategoryRepository) *CategoryUsecase {
	return &CategoryUsecase{repo: r}
}

func (u *CategoryUsecase) GetAll() ([]domain.Category, error) {
	return u.repo.GetAll()
}