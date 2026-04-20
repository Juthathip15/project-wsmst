CREATE TABLE IF NOT EXISTS api_products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  target_users TEXT NOT NULL,
  available_plans TEXT NOT NULL,
  method TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  sample_request TEXT,
  sample_response TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO api_products (
  slug,
  name,
  category,
  description,
  target_users,
  available_plans,
  method,
  endpoint,
  status,
  sample_request,
  sample_response
) VALUES
(
  'health-risk-score',
  'Health Risk Score API',
  'Risk Analysis',
  'ประเมินระดับความเสี่ยงสุขภาพเบื้องต้นจากอายุ BMI น้ำตาล คอเลสเตอรอล และความดัน',
  'Insurance,Hospital,Health App',
  'silver,gold',
  'POST',
  '/api/v1/analysis/risk-score',
  'active',
  '{"age":35,"bmi":27.4,"bloodSugar":118,"cholesterol":210,"systolicBP":138,"diastolicBP":88,"smoking":false,"exerciseFreqPerWeek":1}',
  '{"status":"success","message":"risk score calculated","data":{"score":60,"riskLevel":"high"}}'
),
(
  'insurance-risk-screening',
  'Insurance Risk Screening API',
  'Insurance Scoring',
  'คัดกรองความเสี่ยงเบื้องต้นสำหรับการประเมินด้านประกันสุขภาพ',
  'Insurance',
  'gold',
  'POST',
  '/api/v1/analysis/insurance-score',
  'active',
  '{"age":42,"bmi":29.1,"bloodSugar":125}',
  '{"status":"success","message":"insurance score calculated","data":{"score":78,"riskLevel":"high"}}'
),
(
  'health-service-search',
  'Health Service Search API',
  'Service Search',
  'ค้นหาบริการตรวจสุขภาพและแพ็กเกจบริการสุขภาพตามหมวดหมู่และราคา',
  'Hospital,Health App',
  'basic,silver,gold',
  'GET',
  '/api/v1/services',
  'active',
  '{"q":"blood","minPrice":1000,"maxPrice":3000}',
  '{"data":[{"id":1,"name":"Advanced Blood Test"}]}'
),
(
  'health-recommendation',
  'Health Recommendation API',
  'Recommendation',
  'แนะนำแนวทางดูแลสุขภาพเบื้องต้นจากผลการประเมินความเสี่ยง',
  'Hospital,Health App',
  'silver,gold',
  'POST',
  '/api/v1/recommendation',
  'active',
  '{"riskLevel":"medium","age":35}',
  '{"data":{"recommendations":["ควรออกกำลังกายอย่างน้อย 3 ครั้งต่อสัปดาห์"]}}'
);