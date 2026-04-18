class Usage {//ใช้ทำกราฟ
  final String date;
  final int requests;

  Usage({
    required this.date,
    required this.requests,
  });

  factory Usage.fromJson(Map<String, dynamic> json) {
    return Usage(
      date: json['date'],
      requests: json['requests'],
    );
  }
}