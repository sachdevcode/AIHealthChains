import React, { useState, useEffect } from 'react';
import './StatsDashboard.css';
import { apiService } from '../services/apiService';

const StatsDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const data = await apiService.getStats();
        setStats(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="stats-dashboard-container">
        <div className="loading">Loading statistics...</div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="stats-dashboard-container">
        <div className="error">Error loading statistics: {error || 'No data available'}</div>
      </div>
    );
  }

  return (
    <div className="stats-dashboard-container">
      <h2>Platform Statistics</h2>

      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-label">Total Patients</div>
          <div className="stat-value">{stats.totalPatients}</div>
          <div className="stat-description">Registered patients</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Records</div>
          <div className="stat-value">{stats.totalRecords}</div>
          <div className="stat-description">Medical records stored</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Consents</div>
          <div className="stat-value">{stats.totalConsents}</div>
          <div className="stat-description">
            {stats.activeConsents} Active • {stats.pendingConsents} Pending
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Transactions</div>
          <div className="stat-value">{stats.totalTransactions}</div>
          <div className="stat-description">Blockchain transactions</div>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;


