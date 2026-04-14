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
	serviceRepo := sqliterepo.NewServiceRepository(database)

	// ถ้ามี repo 2 ตัวนี้จริง ค่อยเปิดใช้
	// subscriptionRepo := sqliterepo.NewSubscriptionRepository(database)
	// usageRepo := sqliterepo.NewUsageRepository(database)

	authUsecase := usecase.NewAuthUsecase(userRepo)
	patientUsecase := usecase.NewPatientUsecase(patientRepo)
	recordUsecase := usecase.NewHealthRecordUsecase(recordRepo, patientRepo)
	serviceUsecase := usecase.NewServiceUsecase(serviceRepo)

	// ถ้ามี repo/usecase จริง ค่อยเปิดใช้
	// subUsecase := usecase.NewSubscriptionUsecase(subscriptionRepo)
	// usageUsecase := usecase.NewUsageUsecase(usageRepo)

	authHandler := deliveryhttp.NewAuthHandler(authUsecase)
	patientHandler := deliveryhttp.NewPatientHandler(patientUsecase)
	recordHandler := deliveryhttp.NewHealthRecordHandler(recordUsecase)
	serviceHandler := deliveryhttp.NewServiceHandler(serviceUsecase)

	router := deliveryhttp.NewRouter(authHandler, patientHandler, recordHandler, serviceHandler)

	// ถ้ายังไม่ได้ใช้ subscription middleware ให้ใช้แค่นี้ก่อน
	handler := deliveryhttp.CORSMiddleware(router)

	// ถ้าจะใช้ subscription middleware ค่อยเปลี่ยนเป็นแบบนี้
	/*
		handler := deliveryhttp.CORSMiddleware(
			deliveryhttp.SubscriptionMiddleware(subUsecase, usageUsecase)(router),
		)
	*/

	log.Println("server started at :8080")
	if err := nethttp.ListenAndServe(":8080", handler); err != nil {
		log.Fatalf("failed to start server: %v", err)
	}
}