class Health {
  final String? userId;
  final String bloodType;
  final double bmi;
  final int bloodSugar;
  final int cholesterol;
  final String bloodPressure;
  final String riskLevel;

  Health({
    this.userId,
    required this.bloodType,
    required this.bmi,
    required this.bloodSugar,
    required this.cholesterol,
    required this.bloodPressure,
    required this.riskLevel,
  });

  factory Health.fromJson(Map<String, dynamic> json) {
    return Health(
      userId: json['user_id']?.toString(),
      bloodType: json['blood_type'],
      bmi: (json['bmi'] as num).toDouble(),
      bloodSugar: json['blood_sugar'],
      cholesterol: json['cholesterol'],
      bloodPressure: json['blood_pressure'],
      riskLevel: json['risk_level'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "user_id": userId,
      "blood_type": bloodType,
      "bmi": bmi,
      "blood_sugar": bloodSugar,
      "cholesterol": cholesterol,
      "blood_pressure": bloodPressure,
      "risk_level": riskLevel,
    };
  }
}