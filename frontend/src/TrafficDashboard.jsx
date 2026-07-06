import { useState, useEffect } from 'react';
import axios from 'axios';

function TrafficDashboard() {
  const [area, setArea] = useState('');
  const [data, setData] = useState([]);
  const [advice, setAdvice] = useState('');
  const [areas, setAreas] = useState([]);

useEffect(() => {
  axios.get('http://localhost:5000/api/areas')
    .then(res => setAreas(res.data))
    .catch(err => console.error('Failed to load areas:', err));
}, []);

  const fetchData = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/api/traffic/${area}`);
    setData(res.data);
    if (res.data.length === 0) alert('No data found for this area name. Check spelling.');
  } catch (err) {
    console.error(err);
    alert('Failed to fetch data.');
  }
  };
  
  const fetchAdvice = async () => {
  const res = await axios.get(`http://localhost:5000/api/recommendation/${area}`);
  setAdvice(res.data.advice);
	};

  return (
  <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
    <h2>Bengaluru Traffic Insight</h2>

    <div style={{ marginBottom: '15px' }}>
      <select value={area} onChange={(e) => setArea(e.target.value)} style={{ padding: '8px', marginRight: '10px' }}>
  {areas.map((a, i) => (
    <option key={i} value={a}>{a}</option>
  ))}
	</select>
	  
	  
      <button onClick={fetchData} style={{ padding: '8px 16px', marginRight: '8px' }}>
        Get Traffic Insight
      </button>
      <button onClick={fetchAdvice} style={{ padding: '8px 16px' }}>
        Ask AI
      </button>
    </div>

    {advice && (
      <div style={{ marginBottom: '20px', padding: '12px', border: '1px solid #555', textAlign: 'left' }}>
        <strong>AI Recommendation:</strong> {advice}
      </div>
    )}

    <table border="1" cellPadding="8" style={{ margin: '0 auto', width: '100%' }}>
      <thead>
        <tr>
          <th>Date</th><th>Congestion</th><th>Avg Speed</th><th>Incidents</th><th>Risk</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            <td>{row.Date.value}</td>
            <td>{row['Congestion Level']}</td>
            <td>{row['Average Speed']}</td>
            <td>{row['Incident Reports']}</td>
            <td>{row.risk.level} ({row.risk.score})</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}

export default TrafficDashboard;