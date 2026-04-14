export default function AnalysisResult({ history }) {
  if (!history || history.length === 0) {
    return (
      <div className="card">
        <h2>Analysis Result</h2>
        <p>No health record found</p>
      </div>
    );
  }

  const latest = history[0];

  const bmi = latest.items.find((item) => item.itemType === "BMI");
  const sugar = latest.items.find((item) => item.itemType === "Blood Sugar");
  const cholesterol = latest.items.find((item) => item.itemType === "Cholesterol");

  const messages = [];

  if (bmi) {
    if (bmi.value >= 30) messages.push("BMI อยู่ในระดับอ้วน");
    else if (bmi.value >= 25) messages.push("BMI เกินเกณฑ์");
    else messages.push("BMI อยู่ในเกณฑ์ปกติ");
  }

  if (sugar) {
    if (sugar.value >= 126) messages.push("น้ำตาลในเลือดสูง เสี่ยงเบาหวาน");
    else if (sugar.value >= 100) messages.push("น้ำตาลเริ่มเสี่ยง");
    else messages.push("น้ำตาลในเลือดปกติ");
  }

  if (cholesterol) {
    if (cholesterol.value >= 240) messages.push("คอเลสเตอรอลสูง");
    else if (cholesterol.value >= 200) messages.push("คอเลสเตอรอลเริ่มเสี่ยง");
    else messages.push("คอเลสเตอรอลปกติ");
  }

  return (
    <div className="card">
      <h2>Analysis Result</h2>
      <p>
        Latest record date: <strong>{latest.recordDate}</strong>
      </p>
      <ul className="list">
        {messages.map((msg, index) => (
          <li key={index} className="list-item">
            {msg}
          </li>
        ))}
      </ul>
    </div>
  );
}