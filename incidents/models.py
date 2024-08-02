from django.db import models

class Incident(models.Model):
    INCIDENT_PRIORITY_CHOICES = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
    ]

    INCIDENT_TYPE_CHOICES = [
        ('Malware', 'Malware'),
        # Add other types as needed
    ]

    incident_name = models.CharField("Incident Name", max_length=500)
    date_of_incident = models.DateField("Date of Incident")
    incident_priority = models.CharField("Incident Priority", max_length=6, choices=INCIDENT_PRIORITY_CHOICES)
    time_of_occurrence = models.TimeField("Time Incident Occurred")
    time_of_resolution = models.TimeField("Time Incident Was Resolved", blank=True, null=True)
    incident_type = models.CharField("Incident Type", max_length=50, choices=INCIDENT_TYPE_CHOICES)
    personnel_involved = models.TextField("Personnel Involved", blank=True, null=True)
    incident_impact = models.TextField("Incident Impact", blank=True, null=True)
    brief_summary = models.TextField("Brief Summary", blank=True, null=True)

    def __str__(self):
        return self.incident_name
