import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { AppBar, Toolbar, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Container } from "@mui/material";

const Incidents = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const [incidents, setIncidents] = useState([]);
  const [open, setOpen] = useState(false);
  const [newIncident, setNewIncident] = useState({
    incident_name: "",
    date_of_incident: "",
    incident_priority: "",
    time_of_occurrence: "",
    time_of_resolution: "",
    incident_type: "",
    personnel_involved: "",
    incident_impact: "",
    brief_summary: ""
  });

  useEffect(() => {
    if (isAuthenticated) {
      axios.get("/api/incidents/")
        .then(response => {
          setIncidents(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the incidents!", error);
        });
    }
  }, [isAuthenticated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIncident({ ...newIncident, [name]: value });
  };

  const handleCreateIncident = () => {
    axios.post("/api/incidents/", newIncident)
      .then(response => {
        setIncidents([...incidents, response.data]);
        setOpen(false);
        setNewIncident({
          incident_name: "",
          date_of_incident: "",
          incident_priority: "",
          time_of_occurrence: "",
          time_of_resolution: "",
          incident_type: "",
          personnel_involved: "",
          incident_impact: "",
          brief_summary: ""
        });
      })
      .catch(error => {
        console.error("There was an error creating the incident!", error);
      });
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, textAlign: "center" }}>
            Company Logo
          </Typography>
          {isAuthenticated ? (
            <>
              <Typography variant="body1" style={{ marginRight: 16 }}>
                {user.name}
              </Typography>
              <Button color="inherit" onClick={() => logout({ returnTo: window.location.origin })}>Logout</Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => loginWithRedirect()}>Login</Button>
          )}
        </Toolbar>
      </AppBar>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)} style={{ marginTop: 20 }}>
        Create New Incident
      </Button>
      <MUIDataTable
        title={"Incidents"}
        data={incidents}
        columns={[
          { name: "incident_name", label: "Incident Name" },
          { name: "date_of_incident", label: "Date of Incident" },
          { name: "incident_priority", label: "Incident Priority" },
          { name: "time_of_occurrence", label: "Time of Occurrence" },
          { name: "time_of_resolution", label: "Time of Resolution" },
          { name: "incident_type", label: "Incident Type" },
          { name: "personnel_involved", label: "Personnel Involved" },
          { name: "incident_impact", label: "Incident Impact" },
          { name: "brief_summary", label: "Brief Summary" },
        ]}
        options={{
          selectableRows: "none"
        }}
      />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New Incident</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="incident_name"
            label="Incident Name"
            fullWidth
            value={newIncident.incident_name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="date_of_incident"
            label="Date of Incident"
            fullWidth
            value={newIncident.date_of_incident}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="incident_priority"
            label="Incident Priority"
            fullWidth
            value={newIncident.incident_priority}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="time_of_occurrence"
            label="Time of Occurrence"
            fullWidth
            value={newIncident.time_of_occurrence}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="time_of_resolution"
            label="Time of Resolution"
            fullWidth
            value={newIncident.time_of_resolution}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="incident_type"
            label="Incident Type"
            fullWidth
            value={newIncident.incident_type}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="personnel_involved"
            label="Personnel Involved"
            fullWidth
            value={newIncident.personnel_involved}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="incident_impact"
            label="Incident Impact"
            fullWidth
            value={newIncident.incident_impact}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="brief_summary"
            label="Brief Summary"
            fullWidth
            value={newIncident.brief_summary}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateIncident} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Incidents;
