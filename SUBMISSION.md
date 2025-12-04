# AI Health Chains - Assessment Submission

## Overview
This is the completed frontend implementation for the AI Health Chains Web3 MERN Stack Developer Assessment.

## Implementation Details
I have implemented the following components as requested:

1.  **PatientList**: Displays paginated patient data with search functionality.
2.  **PatientDetail**: Shows patient profile and medical records.
3.  **ConsentManagement**: Allows creating consents with MetaMask signing and managing consent status.
4.  **TransactionHistory**: Lists blockchain transactions with wallet filtering.
5.  **StatsDashboard**: Visualizes platform statistics.

## Key Changes & Fixes
- **Port Configuration**: The backend is configured to run on port `5001` to avoid conflicts with macOS system services on port 5000.
- **Security**: Removed malicious code found in `backend/data/mockData.js`.
- **Bug Fixes**: Corrected API response handling in frontend components to match the backend structure.
- **UI/UX**: Refactored components to strictly follow the provided CSS styles.

## How to Run

### Prerequisites
- Node.js
- MetaMask Browser Extension

### Quick Start
I have added a `start` script to the root `package.json` for convenience.

1.  **Install Dependencies** (if not already done):
    ```bash
    npm run install-all
    ```

2.  **Start the Application**:
    ```bash
    npm start
    ```
    This command will concurrently run:
    - Backend Server: `http://localhost:5001`
    - Frontend Application: `http://localhost:3000`

3.  **Access**: Open `http://localhost:3000` in your browser.

## Tech Stack
- **Frontend**: React, Axios, Ethers.js
- **Backend**: Node.js, Express
- **Database**: Mock JSON Data
