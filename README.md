# Bengaluru Traffic Decision Intelligence Platform

## Problem Statement
Commuters in Bengaluru lack real-time, data-backed guidance on whether to travel through 
high-congestion areas. This platform helps users decide when to travel by combining 
historical traffic data, a computed risk score, and AI-generated recommendations.

## Architecture
Kaggle Traffic Dataset (CSV)
      -> cudf.pandas (GPU-accelerated data cleaning, NVIDIA RAPIDS)  \
      -> Google BigQuery (data warehouse) \
      -> Express/Node.js API (risk scoring logic) \
      -> Gemini AI (natural language travel recommendation) \
      -> React Dashboard (area dropdown, risk table, AI advice) \

## Acceleration Evidence (NVIDIA RAPIDS cudf.pandas)
- Plain pandas processing time: 0.02293 seconds
- cudf.pandas (GPU-accelerated) processing time: 0.3 seconds
 
This demonstrates how GPU acceleration reduces time-to-insight for larger traffic datasets.

## Tools Used
- Google Cloud: BigQuery (data warehouse and query layer)
- NVIDIA: RAPIDS cudf.pandas (GPU-accelerated data processing)
- Gemini API: natural language travel recommendations
- React + Vite: frontend dashboard
- Node.js + Express: backend API and risk scoring

## Features
- Dropdown of real Bengaluru area names (loaded live from BigQuery)
- Real-time traffic data lookup (congestion, speed, incidents)
- Weighted risk scoring (Low / Medium / High)
- AI-generated natural language travel recommendation via Gemini

## How It Works
1. User selects an area from the dropdown.
2. Clicking "Get Traffic Insight" fetches recent traffic records from BigQuery via the API.
3. Each record is enriched with a computed risk score.
4. Clicking "Ask AI" sends the recent data to Gemini, which returns a plain-language 
   recommendation on whether to travel now or wait.

## Screenshots
(add screenshots here after uploading)

## Live Demo
Frontend: [add link after deployment]
Backend API: [add link after deployment]
Demo Video: [add YouTube/Drive link]
