# SMPC Privacy-Preserving Data Platform

![SMPC](https://img.shields.io/badge/SMPC-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB)
![Flask](https://img.shields.io/badge/Flask-2.3.2-000000)
![Python](https://img.shields.io/badge/Python-3.9+-3776AB)

SMPC Privacy-Preserving Data Platform is a comprehensive solution for secure multi-party computation (SMPC) to aggregate and analyze data without compromising privacy. The application combines a modern React frontend with a powerful Python Flask backend to provide an intuitive and effective SMPC service.

<!--![SMPC Screenshot](assets/SMPC_1.png)
![SMPC Screenshot](assets/SMPC_2.png)
![SMPC Screenshot](assets/SMPC_3.png)-->


## 🔍 Overview

SMPC Privacy-Preserving Data Platform helps organizations securely aggregate and analyze data from multiple parties without revealing individual data points. The platform uses secure multi-party computation techniques to ensure data privacy.

### Project Architecture

```
smpc-privacy-preserving-data/
├── frontend/        # React frontend application
│   ├── public/
│   ├── src/
│   ├── .env
│   └── package.json
│
├── backend/         # Flask backend API
│   ├── app/
│   │   ├── smpc.py  # Main SMPC logic
│   ├── run.py  # Server file
│   ├── .env
│   └── requirements.txt
│
└── README.md        # This file
```

## ✨ Key Features

### SMPC Capabilities
- **Secure Aggregation**: Aggregate data using secure multi-party computation
- **Privacy-Preserving**: Ensure data privacy during computation
- **Flexible Data Types**: Support for various data types and aggregation methods

### User Experience
- **Intuitive Interface**: Clean, responsive design works across devices
- **Real-time Feedback**: Toast notifications provide operation status
- **Animated UI**: Smooth transitions make interaction pleasant
- **Performance Optimizations**: Concurrent processing for faster results

## 🛠 Technologies Used

### Frontend (Client)
- React 18.2.0
- Framer Motion (animations)
- React Icons
- TailwindCSS

### Backend (Server) 
- Python 3.9+
- Flask web framework
- MPyC (Multiparty Computation in Python)
- Thread pool for concurrent processing

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16+)
- Python (v3.9+)
- npm or yarn
- pip

### Clone the Repository

```bash
git clone https://github.com/yourusername/smpc-privacy-preserving-data.git
cd smpc-privacy-preserving-data
```

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate   # On Windows, use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Run the server
python run.py   # Runs on http://localhost:8000 by default
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev   # Access at http://localhost:5173 by default
```


## 📝 API Documentation

### Aggregate Votes Endpoint

```http
POST /aggregate_votes
```

#### Request Format

```json
{
  "votes": ["Option1", "Option2", "Option1", "Option3"]
}
```

#### Response Format

Success:
```json
{
  "results": {
    "Option1": 2,
    "Option2": 1,
    "Option3": 1
  }
}
```

Error:
```json
{
  "error": "Description of the error that occurred"
}
```

## 📋 Usage Examples

### Example 1: Aggregate Votes

**Input:**
```json
{
  "votes": ["Option1", "Option2", "Option1", "Option3"]
}
```

**Output:**
```json
{
  "results": {
    "Option1": 2,
    "Option2": 1,
    "Option3": 1
  }
}
```

---

&copy; 2025 SMPC Privacy-Preserving Data Platform. All rights reserved.
