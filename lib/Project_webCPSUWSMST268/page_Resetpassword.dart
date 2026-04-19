import 'package:flutter/material.dart';

class page_Resetpassword extends StatefulWidget {
  const page_Resetpassword({super.key});

  @override
  State<page_Resetpassword> createState() => _page_ResetpasswordState();
}

class _page_ResetpasswordState extends State<page_Resetpassword> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _newPasswordController = TextEditingController();
  final TextEditingController _confirmPasswordController =
      TextEditingController();

  bool _obscureNewPassword = true;
  bool _obscureConfirmPassword = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[200],
      body: Center(
        child: SingleChildScrollView(
          child: Container(
            width: 400,
            padding: const EdgeInsets.all(20),
            child: Form(
              key: _formKey,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Text(
                    "รีเซ็ตรหัสผ่านใหม่",
                    style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold),
                  ),

                  const SizedBox(height: 80),

                  TextFormField(
                    controller: _emailController,
                    decoration: InputDecoration(
                      labelText: "อีเมล",
                      hintText: "กรอกอีเมล",
                      floatingLabelStyle: const TextStyle(color: Colors.black),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: const BorderSide(
                          color: Colors.black,
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

                  const SizedBox(height: 20),
                  //รหัสผ่านใหม่
                  TextFormField(
                    controller: _newPasswordController,
                    obscureText: _obscureNewPassword,
                    decoration: InputDecoration(
                      labelText: "รหัสผ่านใหม่",
                      hintText: "กรอกรหัสผ่านใหม่",
                      floatingLabelStyle: const TextStyle(color: Colors.black),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: const BorderSide(
                          color: Colors.black,
                          width: 2,
                        ),
                      ),
                      suffixIcon: IconButton(
                        icon: Icon(
                          _obscureNewPassword
                              ? Icons.visibility_off
                              : Icons.visibility,
                        ),
                        onPressed: () {
                          setState(() {
                            _obscureNewPassword = !_obscureNewPassword;
                          });
                        },
                      ),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return "กรุณากรอกรหัสผ่านใหม่";
                      }
                      if (value.length < 6) {
                        return "รหัสผ่านต้องอย่างน้อย 6 ตัว";
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: 20),
                  //  ยืนยันรหัสผ่านใหม่
                  TextFormField(
                    controller: _confirmPasswordController,
                    obscureText: _obscureConfirmPassword,
                    decoration: InputDecoration(
                      labelText: "ยืนยันรหัสผ่านใหม่",
                      hintText: "กรอกรหัสผ่านอีกครั้ง",
                      floatingLabelStyle: const TextStyle(color: Colors.black),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: const BorderSide(
                          color: Colors.black,
                          width: 2,
                        ),
                      ),
                      suffixIcon: IconButton(
                        icon: Icon(
                          _obscureConfirmPassword
                              ? Icons.visibility_off
                              : Icons.visibility,
                        ),
                        onPressed: () {
                          setState(() {
                            _obscureConfirmPassword = !_obscureConfirmPassword;
                          });
                        },
                      ),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return "กรุณายืนยันรหัสผ่าน";
                      }
                      if (value != _newPasswordController.text) {
                        return "รหัสผ่านไม่ตรงกัน";
                      }
                      return null;
                    },
                  ),

                  const SizedBox(height: 50),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF2C266A),
                        padding: const EdgeInsets.symmetric(vertical: 14),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                      onPressed: () {
                        if (_formKey.currentState!.validate()) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text("รีเซ็ตรหัสผ่านสำเร็จ"),
                            ),
                          );
                        }
                      },
                      child: const Text(
                        "รีเซ็ตรหัสผ่านใหม่",
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
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
