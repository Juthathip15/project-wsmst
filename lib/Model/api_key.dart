class ApiKey {
  final String key;
  final String status;
  final String createdAt;
  final String lastUsed;
  final int requestCount;

  ApiKey({
    required this.key,
    required this.status,
    required this.createdAt,
    required this.lastUsed,
    required this.requestCount,
  });

  factory ApiKey.fromJson(Map<String, dynamic> json) {
  return ApiKey(
    key: json['key'] ?? "",
    status: json['status'] ?? "",
    createdAt: json['created_at'] ?? "",
    lastUsed: json['last_used'] ?? "",
    requestCount: json['request_count'] ?? 0,
  );
}
}