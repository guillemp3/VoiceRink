import { useState } from 'react'
import axios from 'axios';
import './App.css'

export async function callStandings() {
  try {
    const response = await axios.get('http://localhost:3001/api/standings');
    return response.data;
  } catch (error) {
    console.error('Error fetching standings:', error);
    throw error;
  }
}

function App() {
  const [count, setCount] = useState(0)
  const [standings, setStandings] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)


  const fetchStandings = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await callStandings()
      setStandings(data)
    } catch (err) {
      setError(err.message || 'Failed to fetch standings')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h1>VoiceRink</h1>
      <div className="card">
        <button onClick={fetchStandings} disabled={loading}>
          {loading ? 'Loading...' : 'Démarrer le mode "Match en Direct"'}
        </button>

        {error && <div style={{ color: 'red', marginTop: '1rem' }}>Error: {error}</div>}
        {standings && (
          <div style={{ marginTop: '1rem', textAlign: 'left', maxHeight: '400px', overflow: 'auto', whiteSpace: 'pre-wrap', backgroundColor: '#f0f0f0', padding: '1rem', borderRadius: '4px', fontSize: '0.85rem' }}>
            <h3>Standings Data:</h3>
            {JSON.stringify(standings, null, 2)}
          </div>
        )}
      </div>
    </>
  )
}

export default App
