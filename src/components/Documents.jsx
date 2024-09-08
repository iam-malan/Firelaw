import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { 
  Box, Typography, Button, Paper, Tabs, Tab, TextField, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  List, ListItem, ListItemIcon, ListItemText, IconButton
} from '@mui/material';
import { Print, Add, Folder, InsertDriveFile, Delete, CreateNewFolder } from '@mui/icons-material';

const Documents = () => {
  const [tabValue, setTabValue] = useState(0);
  const [documentTabValue, setDocumentTabValue] = useState(1);
  const [documents, setDocuments] = useState([]);
  const [currentFolder, setCurrentFolder] = useState('/');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDocumentTabChange = (event, newValue) => {
    setDocumentTabValue(newValue);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setDocuments([...documents, { name: file.name, type: 'file', folder: currentFolder }]);
    }
  };

  const handleCreateFolder = () => {
    const folderName = prompt('Enter folder name:');
    if (folderName) {
      setDocuments([...documents, { name: folderName, type: 'folder', folder: currentFolder }]);
    }
  };

  const handleDelete = (index) => {
    const newDocuments = [...documents];
    newDocuments.splice(index, 1);
    setDocuments(newDocuments);
  };

  const handleFolderClick = (folderName) => {
    setCurrentFolder(`${currentFolder}${folderName}/`);
  };

  const filteredDocuments = documents.filter(doc => doc.folder === currentFolder);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* ... (keep the existing Tabs and buttons) ... */}

      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Tabs value={documentTabValue} onChange={handleDocumentTabChange}>
            <Tab label="Unread" />
            <Tab label="All" />
          </Tabs>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined">Browse By Tags</Button>
            <TextField placeholder="Filter documents by case..." variant="outlined" size="small" />
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Current Folder: {currentFolder}</Typography>
          <Button variant="contained" component="label" startIcon={<Add />}>
            Upload File
            <input type="file" hidden onChange={handleFileUpload} />
          </Button>
          <Button variant="contained" onClick={handleCreateFolder} startIcon={<CreateNewFolder />} sx={{ ml: 1 }}>
            Create Folder
          </Button>
        </Box>

        {filteredDocuments.length > 0 ? (
          <List>
            {filteredDocuments.map((doc, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(index)}>
                    <Delete />
                  </IconButton>
                }
              >
                <ListItemIcon>
                  {doc.type === 'folder' ? <Folder /> : <InsertDriveFile />}
                </ListItemIcon>
                <ListItemText 
                  primary={doc.name} 
                  onClick={() => doc.type === 'folder' && handleFolderClick(doc.name)}
                  style={{ cursor: doc.type === 'folder' ? 'pointer' : 'default' }}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1">There are no documents in this folder.</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Documents;
