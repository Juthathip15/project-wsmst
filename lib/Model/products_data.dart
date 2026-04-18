class Product {
  final String?  id;
  final String title;
  final double amount;
  final String type;
  final String date;

  Product({this.id,required this.title,required this.amount,required this.type,required this.date,});

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id']?.toString(),
      title: json['title'],
      amount: (json['amount'] as num).toDouble(),
      type: json['type'],
      date: json['date'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "title": title,
      "amount": amount,
      "type": type,
      "date": date,
    };
  }
}