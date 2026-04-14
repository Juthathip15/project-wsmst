package sqlite

import "project-wsmst-backend/domain"

type CategoryRepository struct{}

func NewCategoryRepository() *CategoryRepository {
	return &CategoryRepository{}
}

func (r *CategoryRepository) GetAll() ([]domain.Category, error) {
	return []domain.Category{}, nil
}