import { Button } from '@mui/material';
import { useState } from 'react';
import './App.css';
import KanbanDashboard from './Dashboard/KanbanDashboard';
import TableDashboard from './Dashboard/TableDashboard';

function App() {
  const [kanbanView, setKanbanView] = useState(true)
  return (
    <div className="title" >
      <h1 style={{backgroundColor: '#1976d2', color: 'white', height: 70, margin:0}} >KANBAN Dashboard</h1>
      <div style={{marginTop:30}}>
      <Button onClick={()=>setKanbanView(true)} variant={kanbanView ? 'contained':'outlined'}>Kanban View</Button>
      <Button onClick={()=>setKanbanView(false)} style={{marginLeft: 30}} variant={kanbanView ? 'outlined':'contained'}>Table View</Button>
      <hr style={{marginTop: 30}} />
      </div>
      {
        kanbanView ? <KanbanDashboard /> : <TableDashboard />
      }
    </div>
  );
}

export default App;
