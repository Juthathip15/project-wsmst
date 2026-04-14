package usecase

import (
	"database/sql"
	"errors"

	"project-wsmst-backend/domain"
	internalauth "project-wsmst-backend/internal/auth"
)

type AuthUsecase struct {
	userRepo domain.UserRepository
}

func NewAuthUsecase(userRepo domain.UserRepository) *AuthUsecase {
	return &AuthUsecase{userRepo: userRepo}
}

func (u *AuthUsecase) Register(fullName, email, password, plan string) (domain.User, error) {
	_, err := u.userRepo.GetByEmail(email)
	if err == nil {
		return domain.User{}, errors.New("email already exists")
	}
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return domain.User{}, err
	}

	if plan == "" {
		plan = "basic"
	}

	if plan != "basic" && plan != "silver" && plan != "gold" {
		return domain.User{}, errors.New("invalid plan")
	}

	hashedPassword, err := internalauth.HashPassword(password)
	if err != nil {
		return domain.User{}, err
	}

	user := domain.User{
		FullName:     fullName,
		Email:        email,
		PasswordHash: hashedPassword,
		Role:         "client",
		Plan:         plan,
	}

	return u.userRepo.Create(user)
}

func (u *AuthUsecase) Login(email, password string) (domain.User, string, error) {
	user, err := u.userRepo.GetByEmail(email)
	if err != nil {
		return domain.User{}, "", errors.New("invalid email or password")
	}

	if !internalauth.CheckPasswordHash(password, user.PasswordHash) {
		return domain.User{}, "", errors.New("invalid email or password")
	}

	token, err := internalauth.GenerateToken(user.ID, user.Email, user.Role)
	if err != nil {
		return domain.User{}, "", err
	}

	return user, token, nil
}

func (u *AuthUsecase) GetProfile(userID int64) (domain.User, error) {
	return u.userRepo.GetByID(userID)
}