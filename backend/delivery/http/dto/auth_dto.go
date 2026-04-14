package dto

type RegisterRequest struct {
	FullName string `json:"fullName"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Plan     string `json:"plan"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type UserResponse struct {
	ID       int64  `json:"id"`
	FullName string `json:"fullName"`
	Email    string `json:"email"`
	Role     string `json:"role"`
	Plan     string `json:"plan"`
}

type AuthResponse struct {
	Message string       `json:"message"`
	Token   string       `json:"token,omitempty"`
	User    UserResponse `json:"user"`
}