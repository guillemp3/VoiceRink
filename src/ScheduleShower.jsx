import { useState } from 'react'
import axios from 'axios';
import './App.css'


// Composante pour recuperer et afficher les matchs du jour


export async function callSchedule() {
  try {
    const response = await axios.get('http://localhost:3001/api/horaire');
    return response.data;
  } catch (error) {
    console.error('Error fetching schedule:', error);
    throw error;
  }
}

function ScheduleShower() {
  const [schedule, setSchedule] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)


  const fetchSchedule = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await callSchedule()
      setSchedule(data)
    } catch (err) {
      setError(err.message || 'Failed to fetch schedule')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      
      {/* <h2>Matchs / Schedule</h2> */}
      <div className="card">
        <button onClick={fetchSchedule} disabled={loading}>
          {loading ? 'Loading...' : 'Afficher les matchs disponibles'}
        </button>

        {error && <div style={{ color: 'red', marginTop: '1rem' }}>Error: {error}</div>}
        {schedule && (
          <div style={{ marginTop: '1rem', textAlign: 'left', maxHeight: '400px', overflow: 'auto', whiteSpace: 'pre-wrap', backgroundColor: '#f0f0f0', padding: '1rem', borderRadius: '4px', fontSize: '0.85rem' }}>
            <h3>Matchs:</h3>
            {showGames(schedule)}
          </div>
        )}
      </div>
    </>
  )
}

export default ScheduleShower
// Permettre d'afficher dynamiquement 1 a 5 matchs du jour et la carte
function showGames(schedule) {
  if (!schedule) {
    return <div>Aucun match aujourd'hui!</div>;
  }
  return <>
  <div>{JSON.stringify(schedule.gameWeek[0].games[0].awayTeam.abbrev, null, 2)}</div>
  <div>{JSON.stringify(schedule.gameWeek[0].games[1].awayTeam.abbrev, null, 2)}</div>
  <div>{JSON.stringify(schedule.gameWeek[0].games[2].awayTeam.abbrev, null, 2)}</div>
  <div>{JSON.stringify(schedule.gameWeek[0].games[3].awayTeam.abbrev, null, 2)}</div>
  <div>{JSON.stringify(schedule.gameWeek[0].games[4].awayTeam.abbrev, null, 2)}</div>
  </>
  
}


