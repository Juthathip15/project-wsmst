class SystemStatus {
  final String apiStatus;
  final String databaseStatus;
  final int avgResponseTime;
  final double errorRateToday;
  final int peakRequests;

  SystemStatus({
    required this.apiStatus,
    required this.databaseStatus,
    required this.avgResponseTime,
    required this.errorRateToday,
    required this.peakRequests,
  });

factory SystemStatus.fromJson(Map<String, dynamic> json) {
  return SystemStatus(
    apiStatus: json['api_status'],
    databaseStatus: json['database_status'],
    avgResponseTime: json['avg_response_time_ms'],
    errorRateToday: json['error_rate_today'],
    peakRequests: json['peak_requests_per_min'],
  );
}
}