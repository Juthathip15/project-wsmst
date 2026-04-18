import 'package:flutter/material.dart';
import 'package:flutter_application_1/Project_webCPSUWSMST268/page_Dashboard.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class Page_AboutUs extends StatefulWidget {
  const Page_AboutUs({super.key});

  @override
  State<Page_AboutUs> createState() => _Page_AboutUsState();
}

class _Page_AboutUsState extends State<Page_AboutUs> {
  Map<String, dynamic>? dashboard;
  Map<String, dynamic>? systemStatus;
  bool isLoading = false;

  Future<void> fetchData() async {
    setState(() => isLoading = true);

    final dashboardRes = await http.get(
      Uri.parse("http://localhost:4000/dashboard"),
    );

    final systemRes = await http.get(
      Uri.parse("http://localhost:4000/system_status"),
    );

    final dashboardData = json.decode(dashboardRes.body);
    final systemData = json.decode(systemRes.body);

    setState(() {
      dashboard = (dashboardData as List).first;

      // system_status เป็น MAP อยู่แล้ว
      systemStatus = systemData;

      isLoading = false;
    });
  }

  @override
  void initState() {
    super.initState();
    fetchData(); // เรียก API ตอนเปิดหน้า
  }

  Widget navItem(String title, bool isActive) {
    return GestureDetector(
      onTap: () {
        if (title == "แดชบอร์ด") {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => const page_Dashboard()),
          );
        }
        if (title == "เกี่ยวกับเรา") {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => const Page_AboutUs()),
          );
        }
      },
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 15),
        padding: const EdgeInsets.only(bottom: 5),
        decoration: BoxDecoration(
          border: isActive
              ? const Border(bottom: BorderSide(color: Colors.white, width: 2))
              : null,
        ),
        child: Text(
          title,
          style: const TextStyle(color: Colors.white, fontSize: 16),
        ),
      ),
    );
  }

  Widget infoBox(String text) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.black12),
        boxShadow: [
          BoxShadow(
            color: Colors.black12.withOpacity(0.05),
            blurRadius: 8,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Text(text, style: const TextStyle(fontSize: 14, height: 1.5)),
    );
  }

  Widget box(
    String value,
    String title, {
    Color? valueColor,
    double? valueSize,
  }) {
    return Container(
      width: 150,
      height: 150,
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(15),
        border: Border.all(color: Colors.black12),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            value,
            style: TextStyle(
              fontSize: valueSize ?? 18,
              fontWeight: FontWeight.bold,
              color: valueColor ?? Colors.black,
            ),
          ),
          const SizedBox(height: 10),
          Text(
            title,
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 14, color: Colors.grey),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF5F6FA),
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(100),
        child: Container(
          color: const Color(0xFF2C266A), // สีม่วงเข้ม
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              // โลโก้
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 15,
                  vertical: 8,
                ),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                ),
                child: const Text("โลโก้"),
              ),

              // เมนู
              Row(
                children: [
                  navItem("หน้าแรก", false),
                  navItem("เกี่ยวกับเรา", true),
                  navItem("แพ็คเกจ", false),
                  navItem("แดชบอร์ด", false),
                ],
              ),

              // search + profile
              Row(
                children: [
                  Container(
                    width: 120,
                    height: 30,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(20),
                    ),
                    padding: const EdgeInsets.symmetric(
                      vertical: 1,
                      horizontal: 15,
                    ),
                    child: const TextField(
                      decoration: InputDecoration(
                        border: InputBorder.none,
                        hintText: "ค้นหา",
                      ),
                    ),
                  ),
                  const SizedBox(width: 10),
                  const Icon(Icons.person, color: Colors.white),
                ],
              ),
            ],
          ),
        ),
      ),

      body: Padding(
        padding: const EdgeInsets.all(50),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                "เกี่ยวกับเรา (About Us)",
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),

              const SizedBox(height: 35),

              Center(
                child: SizedBox(
                  width: 700,
                  child: const Text(
                    "เราคือผู้ให้บริการ Web Service และ API ด้านข้อมูลสุขภาพและข้อมูลสถานพยาบาล \nสำหรับองค์กรที่ต้องการเชื่อมต่อข้อมูลเพื่อการวิเคราะห์ วางแผนบริการ \nและพัฒนาธุรกิจสุขภาพอย่างมีประสิทธิภาพ",
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 18, height: 1.6),
                  ),
                ),
              ),

              const SizedBox(height: 50),

              Padding(
                padding: const EdgeInsets.only(left: 180, right: 180, top: 10),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: const [
                          Text(
                            "\n\n เรามุ่งเน้นการให้บริการข้อมูลในรูปแบบที่เหมาะสมต่อการใช้งานเชิงธุรกิจและเชิงวิเคราะห์ เช่น\nข้อมูลเชิงสถิติ ข้อมูลสรุป และข้อมูลที่ผ่านกระบวนการคุ้มครองความเป็นส่วนตัวเพื่อช่วยให้โรงพยาบาล\nคลินิก บริษัทประกัน และ HealthTech สามารถนำข้อมูลไปต่อยอดได้อย่างปลอดภัย\n\n  เราให้ความสำคัญกับมาตรฐานความปลอดภัยของข้อมูลความถูกต้องของชุดข้อมูล \nและการดำเนินงานที่สอดคล้องกับหลักการคุ้มครองข้อมูลส่วนบุคคล",
                            style: TextStyle(fontSize: 18, height: 1.6),
                          ),

                          SizedBox(height: 20),
                        ],
                      ),
                    ),

                    const SizedBox(width: 20),

                    Column(
                      children: [
                        Row(
                          children: [
                            box(
                              "250+",
                              "APIs & AI Models",
                              valueColor: Color(0xFF017E81),
                              valueSize: 25,
                            ),
                            const SizedBox(width: 15),
                            box(
                              "${(dashboard?['uptime'] ?? 0).toString()}%",
                              "Uptime",
                              valueColor: Color(0xFF78A3D4),
                              valueSize: 25,
                            ),
                          ],
                        ),

                        const SizedBox(height: 15),

                        Row(
                          children: [
                            box(
                              "${dashboard?['rate_limit_per_min'] ?? 0} dev/min",
                              "Developers",
                              valueColor: Colors.purple,
                              valueSize: 20,
                            ),
                            const SizedBox(width: 15),
                            box(
                              "24/7", 
                              "Support",
                              valueColor: Color(0xFF73C088),
                              valueSize: 25,
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
      //สีพื้นหลังของแถบด้านล่าง
      bottomNavigationBar: Container(
        height: 50,
        color: const Color(0xFF2C266A),
      ),
    );
  }
}
