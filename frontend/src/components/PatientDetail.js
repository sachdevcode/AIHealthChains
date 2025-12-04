import React, { useState, useEffect } from 'react';
import './PatientDetail.css';
import { apiService } from '../services/apiService';

const PatientDetail = ({ patientId, onBack }) => {
  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      setLoading(true);
      try {
        const [patientData, recordsData] = await Promise.all([
          apiService.getPatient(patientId),
          apiService.getPatientRecords(patientId)
        ]);

        setPatient(patientData);
        setRecords(recordsData.records);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchPatientData();
    }
  }, [patientId]);

  if (loading) {
    return (
      <div className="patient-detail-container">
        <div className="loading">Loading patient details...</div>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="patient-detail-container">
        <div className="error">Error loading patient: {error || 'Patient not found'}</div>
        <button onClick={onBack} className="back-btn">Back to List</button>
      </div>
    );
  }

  return (
    <div className="patient-detail-container">
      <div className="patient-detail-header">
        <button onClick={onBack} className="back-btn">← Back to List</button>
        <h2>{patient.name}</h2>
      </div>

      <div className="patient-detail-content">
        <div className="patient-info-section">
          <h2>Patient Information</h2>
          <div className="patient-info-grid">
            <div className="info-item">
              <span className="info-label">ID</span>
              <span className="info-value">{patient.patientId}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{patient.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Date of Birth</span>
              <span className="info-value">{new Date(patient.dateOfBirth).toLocaleDateString()}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Gender</span>
              <span className="info-value">{patient.gender}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone</span>
              <span className="info-value">{patient.phone}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Address</span>
              <span className="info-value">{patient.address}</span>
            </div>
            <div className="info-item full-width">
              <span className="info-label">Wallet Address</span>
              <span className="info-value wallet">{patient.walletAddress || 'Not connected'}</span>
            </div>
          </div>
        </div>

        <div className="patient-records-section">
          <h2>Medical Records ({records.length})</h2>
          {records.length === 0 ? (
            <p className="no-records">No medical records found.</p>
          ) : (
            <div className="records-list">
              {records.map((record) => (
                <div key={record.id} className="record-card">
                  <div className="record-header">
                    <span className="record-title">{record.title}</span>
                    <span className={`record-type ${record.type.toLowerCase()}`}>
                      {record.type}
                    </span>
                  </div>
                  <p className="record-description">{record.description}</p>
                  <div className="record-meta">
                    <div className="record-meta-item">
                      <span className="info-label">Date:</span>
                      <span>{new Date(record.date).toLocaleDateString()}</span>
                    </div>
                    <div className="record-meta-item">
                      <span className="info-label">Doctor:</span>
                      <span>{record.doctor}</span>
                    </div>
                    <div className="record-meta-item">
                      <span className="info-label">Hospital:</span>
                      <span>{record.hospital}</span>
                    </div>
                    <div className="record-meta-item">
                      <span className="info-label">Hash:</span>
                      <span className="info-value wallet" style={{ fontSize: '0.8rem' }}>
                        {record.blockchainHash.slice(0, 10)}...{record.blockchainHash.slice(-8)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;


