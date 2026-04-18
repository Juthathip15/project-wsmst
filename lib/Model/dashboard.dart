class Dashboard {
  final String id;
  final String hospital;
  final String plan;
  final int quota;
  final int used;
  final int remaining;
  final int rateLimitPerMin;
  final int currentRateUsed;
  final int resetInDays;
  final int successRate;
  final int errorRate;
  final double uptime;
  final String lastUpdated;
  final int aiModels;
  final int developers;
  final String supportLevel;

  Dashboard({
    required this.id,
    required this.hospital,
    required this.plan,
    required this.quota,
    required this.used,
    required this.remaining,
    required this.rateLimitPerMin,
    required this.currentRateUsed,
    required this.resetInDays,
    required this.successRate,
    required this.errorRate,
    required this.uptime,
    required this.lastUpdated,
    required this.aiModels,
    required this.developers,
    required this.supportLevel,
  });

  factory Dashboard.fromJson(Map<String, dynamic> json) {
    return Dashboard(
      id: json['id'],
      hospital: json['hospital'],
      plan: json['plan'],
      quota: json['quota'],
      used: json['used'],
      remaining: json['remaining'],
      rateLimitPerMin: json['rate_limit_per_min'],
      currentRateUsed: json['current_rate_used'],
      resetInDays: json['reset_in_days'],
      successRate: json['success_rate'],
      errorRate: json['error_rate'],
      uptime: (json['uptime'] as num).toDouble(),
      lastUpdated: json['last_updated'],
      aiModels: json['ai_models'] ?? 0,
      developers: json['developers'] ?? 0,
      supportLevel: json['support_level'] ?? "-",
    );
  }
}
