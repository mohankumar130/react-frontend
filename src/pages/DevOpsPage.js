import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [form, setForm] = useState({
    age: '', gender: '', bmi: '', smoking: '',
    systolic_bp: '', cholesterol: '', glucose: ''
  });
  const [result, setResult] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://172.25.54.219:8000/api/predict/', {
        ...form,
        age: parseFloat(form.age),
        gender: parseInt(form.gender),
        bmi: parseFloat(form.bmi),
        smoking: parseInt(form.smoking),
        systolic_bp: parseFloat(form.systolic_bp),
        cholesterol: parseInt(form.cholesterol),
        glucose: parseInt(form.glucose)
      });
      setResult(res.data);
    } catch (err) {
      alert('Prediction failed. Check server/API.');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Health Risk Prediction</h2>
      <form onSubmit={handleSubmit}>
        {['age', 'gender', 'bmi', 'smoking', 'systolic_bp', 'cholesterol', 'glucose'].map((field) => (
          <div key={field}>
            <label>{field.replace('_', ' ').toUpperCase()}</label>
            <input
              type="number"
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Predict</button>
      </form>

      {result && (
        <div style={{ marginTop: '20px' }}>
          <h3>Risk Scores:</h3>
          <ul>
            <li>Cardiovascular: {result.risk_scores.cardiovascular} ({result.risk_categories.cardiovascular})</li>
            <li>Diabetes: {result.risk_scores.diabetes} ({result.risk_categories.diabetes})</li>
            <li>Obesity: {result.risk_scores.obesity} ({result.risk_categories.obesity})</li>
          </ul>
          <h4>Recommendations:</h4>
          {['cardiovascular', 'diabetes', 'obesity'].map(cat => (
            <div key={cat}>
              <b>{cat.toUpperCase()}:</b>
              <ul>
                {result.recommendations[cat].map((rec, i) => <li key={i}>{rec}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
