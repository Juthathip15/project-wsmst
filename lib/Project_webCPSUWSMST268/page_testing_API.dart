import 'package:flutter/material.dart';
import 'package:flutter_application_1/Model/Health.dart';
import 'package:flutter_application_1/Project_webCPSUWSMST268/page_AboutUs.dart';
import 'package:flutter_application_1/Project_webCPSUWSMST268/page_Dashboard.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class page_testing_API extends StatefulWidget {
  const page_testing_API({super.key});

  @override
  State<page_testing_API> createState() => _page_testing_APIState();
}

class _page_testing_APIState extends State<page_testing_API> {
  List<Health> healthList = [];
  bool isLoading = false;
  TextEditingController urlController = TextEditingController();
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

  // เรียก API
  Future<void> fetchData() async {
    setState(() {
      isLoading = true;
    });

    final url = Uri.parse("http://localhost:4000/health");

    try {
      final response = await http.get(url);

      print("STATUS: ${response.statusCode}");
      print("BODY: ${response.body}");

      if (response.statusCode == 200) {
        final data = json.decode(response.body);

        setState(() {
          healthList = List<Health>.from(data.map((e) => Health.fromJson(e)));
        });
      } else {
        print("ERROR STATUS");
      }
    } catch (e) {
      print("ERROR: $e");
    }

    setState(() {
      isLoading = false;
    });
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
                  navItem("เกี่ยวกับเรา", false),
                  navItem("แพ็คเกจ", false),
                  navItem("แดชบอร์ด", true),
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
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 20),

            Center(
              child: SizedBox(
                width: 900, // เท่ากล่องด้านล่าง
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: const [
                    Text(
                      "API Testing",
                      style: TextStyle(
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(height: 15),
                    Text(
                      "หน้าทดสอบ API คือส่วนติดต่อผู้ใช้ที่ช่วยให้นักพัฒนาหรือ tester สามารถส่งข้อมูลไปหาเซิร์ฟเวอร์และดูผลลัพธ์ที่ตอบกลับมาได้โดยไม่ต้องเขียนโค้ดเอง",
                      style: TextStyle(fontSize: 14, color: Colors.black87),
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 30),

            SizedBox(
              height: 400, // ปรับสูง/ต่ำได้
              child: Center(
                child: Container(
                  width: 900,
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(15),
                    border: Border.all(color: Colors.black12),
                  ),
                  child: Column(
                    children: [
                      Row(
                        children: [
                          //Dropdown Method
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10),
                            decoration: BoxDecoration(
                              border: Border.all(color: Colors.black),
                              borderRadius: BorderRadius.circular(8),
                              color: Colors.white,
                            ),
                            child: DropdownButton<String>(
                              value: "GET",
                              underline: const SizedBox(),
                              items: [
                                DropdownMenuItem(
                                  value: "GET",
                                  child: Text(
                                    "GET",
                                    style: TextStyle(color: Colors.green),
                                  ),
                                ),
                                DropdownMenuItem(
                                  value: "POST",
                                  child: Text(
                                    "POST",
                                    style: TextStyle(color: Colors.orange),
                                  ),
                                ),
                                DropdownMenuItem(
                                  value: "PUT",
                                  child: Text(
                                    "PUT",
                                    style: TextStyle(color: Colors.blue),
                                  ),
                                ),
                                DropdownMenuItem(
                                  value: "DELETE",
                                  child: Text(
                                    "DELETE",
                                    style: TextStyle(color: Colors.red),
                                  ),
                                ),
                              ],
                              onChanged: (value) {},
                            ),
                          ),

                          const SizedBox(width: 10),

                          //URL
                          Expanded(
                            child: TextField(
                              decoration: InputDecoration(
                                hintText: "http://localhost:4000/health",
                                border: OutlineInputBorder(), //
                              ),
                            ),
                          ),

                          const SizedBox(width: 10),

                          // ปุ่ม Send
                          SizedBox(
                            width: 100,
                            height: 35,
                            child: ElevatedButton(
                              onPressed: fetchData,
                              style: ElevatedButton.styleFrom(
                                backgroundColor: const Color(0xFF274AB3),
                                foregroundColor: Colors.white,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(10),
                                ),
                              ),
                              child: const Text('Send'),
                            ),
                          ),
                        ],
                      ),

                      const SizedBox(height: 20),

                      //Result Box
                      Expanded(
                        child: Container(
                          width: double.infinity,
                          padding: const EdgeInsets.all(10),
                          decoration: BoxDecoration(
                            color: const Color(0xFFF5F6FA),
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(color: Colors.black12),
                          ),
                          child: isLoading
                              ? const Center(child: CircularProgressIndicator())
                              : SingleChildScrollView(
                                  child: Text(
                                    const JsonEncoder.withIndent('  ').convert(
                                      healthList
                                          .map(
                                            (e) => {
                                              "user_id": e.userId,
                                              "blood_type": e.bloodType,
                                              "bmi": e.bmi,
                                              "blood_sugar": e.bloodSugar,
                                              "cholesterol": e.cholesterol,
                                              "blood_pressure": e.bloodPressure,
                                              "risk_level": e.riskLevel,
                                            },
                                          )
                                          .toList(),
                                    ),
                                    style: const TextStyle(
                                      fontFamily: 'monospace',
                                    ),
                                  ),
                                ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
             const SizedBox(height: 10),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Padding(
                  padding: const EdgeInsets.only(right: 300),
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF2C266A),
                      foregroundColor: Colors.white,
                      minimumSize: const Size(5, 50),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) => const page_Dashboard(),
                        ),
                      );
                    },
                    child: const Text(
                      "ย้อนกลับ",
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
      //แถบด่างล่างสีม่วงนํ้าเงิน
      bottomNavigationBar: Container(
        height: 50,
        width: double.infinity,
        color: const Color(0xFF2C266A),
      ),
    );
  }
}
