package http

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"project-wsmst-backend/domain"
)

type AdminHandler struct {
	userRepo domain.UserRepository
}

func NewAdminHandler(userRepo domain.UserRepository) *AdminHandler {
	return &AdminHandler{userRepo: userRepo}
}

type adminUserResponse struct {
	ID       int64  `json:"id"`
	FullName string `json:"fullName"`
	Email    string `json:"email"`
	Role     string `json:"role"`
	Plan     string `json:"plan"`
}

type updateUserRequest struct {
	Role string `json:"role"`
	Plan string `json:"plan"`
}

func (h *AdminHandler) GetUsers(w http.ResponseWriter, r *http.Request) {
	users, err := h.userRepo.GetAll()
	if err != nil {
		http.Error(w, "failed to fetch users", http.StatusInternalServerError)
		return
	}

	var result []adminUserResponse

	for _, u := range users {
		result = append(result, adminUserResponse{
			ID:       u.ID,
			FullName: u.FullName,
			Email:    u.Email,
			Role:     u.Role,
			Plan:     u.Plan,
		})
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func (h *AdminHandler) UpdateUser(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "id")

	userID, err := strconv.ParseInt(idParam, 10, 64)
	if err != nil {
		http.Error(w, "invalid user id", http.StatusBadRequest)
		return
	}

	var req updateUserRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	if req.Role != "admin" && req.Role != "client" {
		http.Error(w, "invalid role", http.StatusBadRequest)
		return
	}

	if req.Plan != "basic" && req.Plan != "silver" && req.Plan != "gold" {
		http.Error(w, "invalid plan", http.StatusBadRequest)
		return
	}

	if err := h.userRepo.UpdateRoleAndPlan(userID, req.Role, req.Plan); err != nil {
		http.Error(w, "failed to update user", http.StatusInternalServerError)
		return
	}

	updatedUser, err := h.userRepo.GetByID(userID)
	if err != nil {
		http.Error(w, "failed to fetch updated user", http.StatusInternalServerError)
		return
	}

	resp := adminUserResponse{
		ID:       updatedUser.ID,
		FullName: updatedUser.FullName,
		Email:    updatedUser.Email,
		Role:     updatedUser.Role,
		Plan:     updatedUser.Plan,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

func (h *AdminHandler) DeleteUser(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "id")

	userID, err := strconv.ParseInt(idParam, 10, 64)
	if err != nil {
		http.Error(w, "invalid user id", http.StatusBadRequest)
		return
	}

	currentUserID, ok := r.Context().Value(UserIDContextKey).(int64)
	if ok && currentUserID == userID {
		http.Error(w, "admin cannot delete own account", http.StatusBadRequest)
		return
	}

	if err := h.userRepo.Delete(userID); err != nil {
		http.Error(w, "failed to delete user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}