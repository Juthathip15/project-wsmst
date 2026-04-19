import 'package:flutter/material.dart';
import 'package:flutter_application_1/Project_webCPSUWSMST268/page_Registry.dart';
import 'package:flutter_application_1/Project_webCPSUWSMST268/page_Resetpassword.dart';

class page_login extends StatefulWidget {
  const page_login({super.key});

  @override
  State<page_login> createState() => _page_loginState();
}

class _page_loginState extends State<page_login> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  bool _obscurePassword = true;
  bool _rememberMe = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[200],
      body: Center(
        child: SingleChildScrollView(
          child: Container(
            width: 420,
            padding: const EdgeInsets.all(20),
            child: Form(
              key: _formKey,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Title
                  const Text(
                    "เข้าสู่ระบบ",
                    style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 80),

                  // Email
                  TextFormField(
                    controller: _emailController,
                    decoration: InputDecoration(
                      labelText: "อีเมล",
                      hintText: "กรอกอีเมล",
                      floatingLabelStyle: const TextStyle(color: Colors.black),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10), // ขอบโค้งมน
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8),
                        borderSide: const BorderSide(
                          color: Colors.black, //  เปลี่ยนสีขอบ
                          width: 2,
                        ),
                      ),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return "กรุณากรอกอีเมล";
                      }
                      if (!value.contains("@")) {
                        return "รูปแบบอีเมลไม่ถูกต้อง";
                      }
                      return null;
                    },
                  ),

                  const SizedBox(height: 15),

                  // Password
                  TextFormField(
                    controller: _passwordController,
                    obscureText: _obscurePassword,
                    decoration: InputDecoration(
                      labelText: "รหัสผ่าน",
                      hintText: "กรอกรหัสผ่าน",
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                      floatingLabelStyle: const TextStyle(color: Colors.black),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8),
                        borderSide: const BorderSide(
                          color: Colors.black,
                          width: 2,
                        ),
                      ),
                      suffixIcon: IconButton(
                        icon: Icon(
                          _obscurePassword
                              ? Icons.visibility_off
                              : Icons.visibility,
                        ),
                        onPressed: () {
                          setState(() {
                            _obscurePassword = !_obscurePassword;
                          });
                        },
                      ),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return "กรุณากรอกรหัสผ่าน";
                      }
                      if (value.length < 6) {
                        return "รหัสผ่านต้องอย่างน้อย 6 ตัว";
                      }
                      return null;
                    },
                  ),

                  const SizedBox(height: 20),

                  // Remember me
                  Row(
                    children: [
                      Checkbox(
                        value: _rememberMe,
                        activeColor: const Color(0xFF2C266A), // สีพื้นตอนติ๊ก
                        checkColor: Colors.white, // สีเครื่องหมายติ๊ก
                        onChanged: (value) {
                          setState(() {
                            _rememberMe = value!;
                          });
                        },
                      ),
                      const Text("จดจำฉัน"),
                    ],
                  ),

                  const SizedBox(height: 10),

                  // Login Button
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF2C266A),
                        padding: const EdgeInsets.symmetric(vertical: 14),
                      ),
                      onPressed: () {
                        if (_formKey.currentState!.validate()) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(content: Text("เข้าสู่ระบบสำเร็จ")),
                          );
                        }
                      },
                      child: const Text(
                        "เข้าสู่ระบบ",
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ),

                  const SizedBox(height: 20),

                  // Register
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Text(
                        "ยังไม่มีบัญชี? ",
                        style: TextStyle(fontSize: 16),
                      ),
                      GestureDetector(
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => const page_Registry(),
                            ),
                          );
                        },
                        child: const Text(
                          "ลงทะเบียนที่นี่",
                          style: TextStyle(fontSize: 16, color: Colors.blue),
                        ),
                      ),
                    ],
                  ),

                  const SizedBox(height: 15),

                  // Forgot Password
                  GestureDetector(
                    onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => const page_Resetpassword(),
                            ),
                          );
                        },
                    child: const Text(
                      "ลืมรหัสผ่าน",
                      style: TextStyle(fontSize: 16, color: Colors.blue),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
