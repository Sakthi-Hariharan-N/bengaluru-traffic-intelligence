require('dotenv').config();
const { BigQuery } = require('@google-cloud/bigquery');

const bigquery = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT
});

async function getTrafficByArea(area) {
  const query = `
    SELECT * FROM \`bengaluru-traffic-intel.traffic_data.traffic_data\`
    WHERE \`Area Name\` = @area
    LIMIT 50
  `;
  const options = { query, params: { area } };
  const [rows] = await bigquery.query(options);
  return rows;
}

function calculateRiskScore(row) {
  const congestion = row['Congestion Level'] || 0;
  const speed = row['Average Speed'] || 0;
  const incidents = row['Incident Reports'] || 0;

  const score = (congestion * 0.5) + (incidents * 5) - (speed * 0.3);

  let level = 'Low';
  if (score > 60) level = 'High';
  else if (score > 30) level = 'Medium';

  return { score: Math.round(score), level };
}

async function getAllAreas() {
  const query = `
    SELECT DISTINCT \`Area Name\` as area
    FROM \`bengaluru-traffic-intel.traffic_data.traffic_data\`
    ORDER BY area
  `;
  const [rows] = await bigquery.query(query);
  return rows.map(r => r.area);
}

module.exports = { getTrafficByArea, calculateRiskScore, getAllAreas };
