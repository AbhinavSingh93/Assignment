# CSV Analyzer API

A Node.js API for analyzing user transaction records from CSV files. Processes CSV data to provide user transaction summaries and handles invalid data gracefully.

## Features
- File upload endpoint for CSV processing
- User transaction summary (credits/debits/totals)
- Identifies user with highest total transactions
- Handles invalid/missing data

## Prerequisites
- Node.js (v14+)
- npm (v6+)

## Installation

1. **Clone the repository**
git clone https://github.com/AbhinavSingh93/Assignment
cd Assignment

2. **Install dependencies**
npm install express multer csv-parser

3. **Install nodemon for development**

## Usage
1. **Start the server**
nodemon index.js
Server will be running at http://localhost:3000

2. **Send CSV file to API**

Postman:
Set request type to POST
URL: http://localhost:3000/analyze
Body > form-data:
Key: file (File type)
Value: Select your CSV file
Then click on send
