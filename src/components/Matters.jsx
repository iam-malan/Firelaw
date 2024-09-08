import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const Matters = () => {
  const [matters, setMatters] = useState([
    { id: 1, name: 'Malan v world', number: '1233/24', stage: 'Trial', firmMembers: 'Malan', nextEvent: 'N/A', nextTask: 'N/A', statusUpdate: 'No updates', added: '08/09/2024, 00:17:47' },
    // Add more sample data as needed
  ]);

  const navigate = useNavigate();

  const handleRowClick = (matterId) => {
    navigate(`/matters/${matterId}`);
  };

  return (
    <div>
      <h1>Matters</h1>
      <Button variant="contained" color="primary">ADD MATTER</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>MATTER</TableCell>
              <TableCell>NUMBER</TableCell>
              <TableCell>MATTER STAGE</TableCell>
              <TableCell>FIRM MEMBERS</TableCell>
              <TableCell>NEXT EVENT</TableCell>
              <TableCell>NEXT TASK</TableCell>
              <TableCell>STATUS UPDATE</TableCell>
              <TableCell>ADDED</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matters.map((matter) => (
              <TableRow key={matter.id} onClick={() => handleRowClick(matter.id)} style={{cursor: 'pointer'}}>
                <TableCell>{matter.name}</TableCell>
                <TableCell>{matter.number}</TableCell>
                <TableCell>{matter.stage}</TableCell>
                <TableCell>{matter.firmMembers}</TableCell>
                <TableCell>{matter.nextEvent}</TableCell>
                <TableCell>{matter.nextTask}</TableCell>
                <TableCell>{matter.statusUpdate}</TableCell>
                <TableCell>{matter.added}</TableCell>
                <TableCell>
                  <Button>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Matters;