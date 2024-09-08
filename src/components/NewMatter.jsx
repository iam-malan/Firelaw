import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Make sure this path is correct

const steps = ['Clients & Contacts', 'Case Details', 'Billing', 'Staff'];

const NewMatter = ({ open, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [matterData, setMatterData] = useState({
    // Clients & Contacts
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',

    // Case Details
    caseName: '',
    caseNumber: '',
    practiceArea: '',
    caseStage: '',
    dateOpened: null,
    office: '',
    description: '',
    statuteOfLimitations: null,

    // Billing
    billingType: '',
    hourlyRate: '',
    retainerAmount: '',
    billingContact: '',

    // Staff
    leadAttorney: '',
    associateAttorney: '',
    paralegal: '',
    legalAssistant: '',
  });

  const handleClose = () => {
    setActiveStep(0);
    setMatterData({});
    onClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMatterData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDateChange = (name) => (date) => {
    setMatterData(prevData => ({
      ...prevData,
      [name]: date
    }));
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, 'matters'), {
        ...matterData,
        dateOpened: matterData.dateOpened ? matterData.dateOpened.toISOString() : null,
        statuteOfLimitations: matterData.statuteOfLimitations ? matterData.statuteOfLimitations.toISOString() : null,
        added: new Date().toISOString(),
      });
      console.log("Document written with ID: ", docRef.id);
      handleClose();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Client Information</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth name="clientName" label="Client Name" value={matterData.clientName} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth name="clientEmail" label="Client Email" value={matterData.clientEmail} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth name="clientPhone" label="Client Phone" value={matterData.clientPhone} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Contact Information</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth name="contactName" label="Contact Name" value={matterData.contactName} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth name="contactEmail" label="Contact Email" value={matterData.contactEmail} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth name="contactPhone" label="Contact Phone" value={matterData.contactPhone} onChange={handleChange} />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth name="caseName" label="Case Name" value={matterData.caseName} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth name="caseNumber" label="Case Number" value={matterData.caseNumber} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Practice Area</InputLabel>
                <Select name="practiceArea" value={matterData.practiceArea} onChange={handleChange}>
                  <MenuItem value="Civil">Civil</MenuItem>
                  <MenuItem value="Criminal">Criminal</MenuItem>
                  <MenuItem value="Corporate">Corporate</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Case Stage</InputLabel>
                <Select name="caseStage" value={matterData.caseStage} onChange={handleChange}>
                  <MenuItem value="Discovery">Discovery</MenuItem>
                  <MenuItem value="Pre-Trial">Pre-Trial</MenuItem>
                  <MenuItem value="Trial">Trial</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date Opened"
                  value={matterData.dateOpened}
                  onChange={handleDateChange('dateOpened')}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Office</InputLabel>
                <Select name="office" value={matterData.office} onChange={handleChange}>
                  <MenuItem value="Primary">Primary</MenuItem>
                  <MenuItem value="Secondary">Secondary</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={4} name="description" label="Description" value={matterData.description} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Statute of Limitations"
                  value={matterData.statuteOfLimitations}
                  onChange={handleDateChange('statuteOfLimitations')}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Billing Type</InputLabel>
                <Select name="billingType" value={matterData.billingType} onChange={handleChange}>
                  <MenuItem value="Hourly">Hourly</MenuItem>
                  <MenuItem value="Flat Fee">Flat Fee</MenuItem>
                  <MenuItem value="Contingency">Contingency</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth name="hourlyRate" label="Hourly Rate" value={matterData.hourlyRate} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth name="retainerAmount" label="Retainer Amount" value={matterData.retainerAmount} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth name="billingContact" label="Billing Contact" value={matterData.billingContact} onChange={handleChange} />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth name="leadAttorney" label="Lead Attorney" value={matterData.leadAttorney} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth name="associateAttorney" label="Associate Attorney" value={matterData.associateAttorney} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth name="paralegal" label="Paralegal" value={matterData.paralegal} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth name="legalAssistant" label="Legal Assistant" value={matterData.legalAssistant} onChange={handleChange} />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Add Case
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 2 }}>
          {renderStepContent(activeStep)}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        ) : (
          <Button onClick={handleNext} variant="contained" color="primary">
            Next
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default NewMatter;
