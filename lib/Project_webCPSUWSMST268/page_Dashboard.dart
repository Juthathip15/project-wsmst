import 'package:flutter/material.dart';
import 'package:flutter_application_1/Model/Health.dart';
import 'package:flutter_application_1/Model/api_key.dart';
import 'package:flutter_application_1/Model/dashboard.dart';
import 'package:flutter_application_1/Model/system_status.dart';
import 'package:flutter_application_1/Model/usage.dart';
import 'package:flutter_application_1/Project_webCPSUWSMST268/page_AboutUs.dart';
import 'package:flutter_application_1/Project_webCPSUWSMST268/page_testing_API.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class page_Dashboard extends StatefulWidget {
  const page_Dashboard({super.key});

  @override
  State<page_Dashboard> createState() => _page_DashboardState();
}

class _page_DashboardState extends State<page_Dashboard> {
  Dashboard? dashboard;
  SystemStatus? systemStatus;
  List<ApiKey> apiKeys = [];
  List<Usage> usageList = [];
  bool isLoading = false;

  @override
  void initState() {
    super.initState();
    print("INIT STATE RUN");
    fetchDashboard(); // เรียก API ตอนเปิดหน้า
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

  //Summary Card Widget
  Widget summaryCard(String title, String value, IconData icon) {
    return Container(
      width: 300, // หรือปรับได้
      margin: const EdgeInsets.all(8),
      padding: const EdgeInsets.all(15),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.black12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: Colors.blue),
          const SizedBox(height: 10),
          Text(title, style: const TextStyle(fontSize: 14)),
          const SizedBox(height: 5),
          Text(
            value,
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
        ],
      ),
    );
  }

  //Progress Bar
  Widget usageBar(int used, int total) {
    double percent = total == 0 ? 0 : used / total;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text("Usage: $used / $total"),
        const SizedBox(height: 5),
        LinearProgressIndicator(
          value: percent,
          minHeight: 8,
          backgroundColor: Colors.grey[300],
          valueColor: AlwaysStoppedAnimation<Color>(
            percent > 0.9
                ? Colors.red
                : percent > 0.7
                ? Colors.orange
                : Colors.green,
          ),
        ),
      ],
    );
  }

  //API Key Box
  Widget apiKeyBox(String key) {
    String hiddenKey = key.length > 5 ? key.substring(0, 5) + "****" : key;

    return Container(
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Colors.grey[100],
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(hiddenKey),
          IconButton(
            icon: const Icon(Icons.copy),
            onPressed: () {
              print("Copied");
            },
          ),
        ],
      ),
    );
  }

  //System Status Box
  Widget systemStatusBox(SystemStatus status) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          "System Status",
          style: TextStyle(fontWeight: FontWeight.bold),
        ),

        const SizedBox(height: 10),

        Text("API: ${status.apiStatus}"),
        Text("Database: ${status.databaseStatus}"),
        Text("Response: ${status.avgResponseTime} ms"),
        Text("Error Today: ${status.errorRateToday}%"),
      ],
    );
  }

  // เรียก API
  Future<void> fetchDashboard() async {
    print("FETCH START");
    setState(() => isLoading = true);

    try {
      final dashboardRes = await http.get(
        Uri.parse("http://localhost:4000/dashboard"),
      );

      final systemRes = await http.get(
        Uri.parse("http://localhost:4000/system_status"),
      );

      final apiKeyRes = await http.get(
        Uri.parse("http://localhost:4000/api_keys"),
      );
      print("DASHBOARD BODY: ${dashboardRes.body}");
      print("SYSTEM BODY: ${systemRes.body}");
      print("API KEY BODY: ${apiKeyRes.body}");

      final dashboardData = json.decode(dashboardRes.body);
      final systemData = json.decode(systemRes.body);
      final apiKeyData = json.decode(apiKeyRes.body);

      setState(() {
        // Dashboard
        if (dashboardData is List && dashboardData.isNotEmpty) {
          dashboard = Dashboard.fromJson(dashboardData[0]);
        } else {
          dashboard = null;
        }

        // API Keys
        if (apiKeyData is List && apiKeyData.isNotEmpty) {
          apiKeys = List<ApiKey>.from(
            apiKeyData.map((e) => ApiKey.fromJson(e)),
          );
        } else {
          apiKeys = [];
        }
        //  System Status (เป็น Map)
        print("dashboard status: ${dashboardRes.statusCode}");
        print("system status: ${systemRes.statusCode}");
        print("apikey status: ${apiKeyRes.statusCode}");
        if (systemRes.statusCode == 200) {
          final systemData = json.decode(systemRes.body);
          systemStatus = SystemStatus.fromJson(systemData);
        } else {
          systemStatus = null;
        }

        isLoading = false;
      });
    } catch (e) {
      print("ERROR: $e");
      setState(() => isLoading = false);
    }
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

      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(left: 110), //ปรับขอบซ้าย
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: const [
                          Text(
                            "แดชบอร์ด",
                            style: TextStyle(
                              fontSize: 19,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),

                    const SizedBox(height: 10),

                    /// TOP CARDS
                    Center(
                      child: SingleChildScrollView(
                        scrollDirection: Axis.horizontal,
                        child: Padding(
                          padding: const EdgeInsets.symmetric(vertical: 10),
                          child: Wrap(
                            spacing: 12,
                            runSpacing: 12,
                            children: [
                              summaryCard(
                                "Plan",
                                dashboard?.plan ?? "-",
                                Icons.workspace_premium,
                              ),
                              summaryCard(
                                "Used",
                                "${dashboard?.used ?? 0}",
                                Icons.bar_chart,
                              ),
                              summaryCard(
                                "Success",
                                "${dashboard?.successRate ?? 0}%",
                                Icons.check_circle,
                              ),
                              summaryCard(
                                "Reset",
                                "${dashboard?.resetInDays ?? 0} days",
                                Icons.timer,
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),

                    const SizedBox(height: 20),

                    /// MAIN SECTION
                    Padding(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 100,
                      ), //ปรับขอบซ้ายขวา
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          /// LEFT - Usage Overview
                          Expanded(
                            flex: 3,
                            child: Container(
                              padding: const EdgeInsets.all(15),
                              decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(
                                  color: Colors.grey.shade300,
                                  width: 1.2,
                                ),
                              ),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text(
                                    "Usage Overview",
                                    style: TextStyle(
                                      fontSize: 20,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),

                                  const SizedBox(height: 15),

                                  Text(
                                    "Track your API consumption in real time",
                                    style: TextStyle(color: Colors.grey),
                                  ),

                                  const SizedBox(height: 15),

                                  usageBar(
                                    dashboard?.used ?? 0,
                                    dashboard?.quota ?? 1,
                                  ),

                                  const SizedBox(height: 15),

                                  Text(
                                    "${((dashboard?.used ?? 0) / (dashboard?.quota ?? 1) * 100).toStringAsFixed(1)}% used",
                                    style: const TextStyle(
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),

                                  const SizedBox(height: 15),

                                  Text(
                                    "Remaining: ${(dashboard?.quota ?? 0) - (dashboard?.used ?? 0)}",
                                  ),

                                  const SizedBox(height: 15),
                                  const Text("Graph coming soon"),
                                ],
                              ),
                            ),
                          ),

                          const SizedBox(width: 15),

                          /// RIGHT
                          Expanded(
                            flex: 1,
                            child: Column(
                              children: [
                                Container(
                                  height: 150,
                                  width: double.infinity,
                                  padding: const EdgeInsets.all(15),
                                  decoration: BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: BorderRadius.circular(12),
                                    border: Border.all(
                                      color: Colors.grey.shade300,
                                    ),
                                  ),
                                  child: systemStatusBox(
                                    systemStatus ??
                                        SystemStatus(
                                          apiStatus: "-",
                                          databaseStatus: "-",
                                          avgResponseTime: 0,
                                          errorRateToday: 0,
                                          peakRequests: 0,
                                        ),
                                  ),
                                  /*
                                  child: systemStatus == null
                                      ? const Center(
                                          child: Text(
                                            "Loading System Status...",
                                          ),
                                        )
                                      : systemStatusBox(systemStatus!), 
                                      */
                                ),

                                const SizedBox(height: 15),

                                Container(
                                  height: 85,
                                  width: double.infinity,
                                  padding: const EdgeInsets.all(15),
                                  decoration: BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: BorderRadius.circular(12),
                                    border: Border.all(
                                      color: Colors.grey.shade300,
                                    ),
                                  ),
                                  child: apiKeys.isNotEmpty
                                      ? apiKeyBox(apiKeys.first.key)
                                      : const Center(child: Text("No API Key")),
                                ),

                                const SizedBox(height: 15),

                                ElevatedButton(
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor:
                                        const Color(0xFF2C266A), // สีปุ่ม
                                    foregroundColor: Colors.white, // สีตัวอักษร
                                    minimumSize: const Size(5, 50), // ความสูง
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(12),
                                    ),
                                  ),

                                  onPressed: () {
                                    Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                        builder: (_) =>
                                            const page_testing_API(),
                                      ),
                                    );
                                  },

                                  child: const Text(
                                    "ทดสอบ API",
                                    style: TextStyle(
                                      fontSize: 16,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
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
