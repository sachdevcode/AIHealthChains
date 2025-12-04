import React, { useState, useEffect, useCallback } from 'react';
import './PatientList.css';
import { apiService } from '../services/apiService';

const PatientList = ({ onSelectPatient }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const fetchPatients = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiService.getPatients(currentPage, 10, searchTerm);
      setPatients(data.patients);
      setPagination(data.pagination);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchPatients();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchPatients]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  if (loading && patients.length === 0) {
    return (
      <div className="patient-list-container">
        <div className="loading">Loading patients...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="patient-list-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="patient-list-container">
      <div className="patient-list-header">
        <h2>Patients</h2>
        <input
          type="text"
          placeholder="Search patients..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="patient-list">
        {patients.length === 0 ? (
          <div className="no-results">No patients found</div>
        ) : (
          patients.map((patient) => (
            <div
              key={patient.id}
              className="patient-card"
              onClick={() => onSelectPatient(patient.id)}
            >
              <div className="patient-card-header">
                <div className="patient-name">{patient.name}</div>
                <div className="patient-id">ID: {patient.patientId}</div>
              </div>
              <div className="patient-info">
                <div className="patient-info-item">
                  <span>{patient.gender}</span>
                </div>
                <div className="patient-info-item">
                  <span>{new Date(patient.dateOfBirth).toLocaleDateString()}</span>
                </div>
                <div className="patient-wallet">
                  {patient.walletAddress ? patient.walletAddress : 'No Wallet Connected'}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {pagination && (
        <div className="pagination">
          <button
            disabled={!pagination.prev}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Previous
          </button>
          <span>Page {pagination.page} of {pagination.pages}</span>
          <button
            disabled={!pagination.next}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientList;


