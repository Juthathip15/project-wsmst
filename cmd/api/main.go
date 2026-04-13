package main

import (
	"log"
	nethttp "net/http"

	deliveryhttp "project-wsmst-backend/delivery/http"
	"project-wsmst-backend/internal/db"
	sqliterepo "project-wsmst-backend/repository/sqlite"
	"project-wsmst-backend/usecase"
)

func main() {
	database, err := db.NewSQLiteDB("/workspaces/project-wsmst/database/data/app.db")
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}
	defer database.Close()

	userRepo := sqliterepo.NewUserRepository(database)
	patientRepo := sqliterepo.NewPatientRepository(database)
	recordRepo := sqliterepo.NewHealthRecordRepository(database)

	authUsecase := usecase.NewAuthUsecase(userRepo)
	patientUsecase := usecase.NewPatientUsecase(patientRepo)
	recordUsecase := usecase.NewHealthRecordUsecase(recordRepo, patientRepo)

	authHandler := deliveryhttp.NewAuthHandler(authUsecase)
	patientHandler := deliveryhttp.NewPatientHandler(patientUsecase)
	recordHandler := deliveryhttp.NewHealthRecordHandler(recordUsecase)

	router := deliveryhttp.NewRouter(authHandler, patientHandler, recordHandler)

	log.Println("server started at :8080")
	if err := nethttp.ListenAndServe(":8080", router); err != nil {
		log.Fatalf("failed to start server: %v", err)
	}
}