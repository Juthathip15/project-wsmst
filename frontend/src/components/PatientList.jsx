export default function PatientList({ patients, selectedPatientId, onSelectPatient }) {
  return (
    <div className="card">
      <h2>Patient List</h2>
      {patients.length === 0 ? (
        <p>No patients found</p>
      ) : (
        <ul className="list">
          {patients.map((patient) => (
            <li
              key={patient.id}
              className={selectedPatientId === patient.id ? "list-item active" : "list-item"}
              onClick={() => onSelectPatient(patient)}
            >
              <strong>{patient.fullName}</strong>
              <span>
                {patient.gender}, {patient.age} yrs, {patient.province}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}