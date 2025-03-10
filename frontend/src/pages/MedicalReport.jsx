import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import { useLocation } from 'react-router-dom';
import exampleImage from '../assets/doc.jpeg';
import logo from '../assets/red-heart-with-heartbeat-line-medical-background_1017-26835.avif';

const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontSize: 12,
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#4f4f4f',
    borderBottom: '2px solid #ba0d35',
  },
  section: {
    marginBottom: 10,
    padding: 10,
    borderBottom: '1px solid #e0e0e0',
  },
  doctor: {
    marginBottom: 10,
    padding: 10,
    border: '2px solid #ba0d35',
    borderRadius: '40px'

  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#3f3f3f',
  },
  text: {
    marginBottom: 5,
    color: '#3f3f3f',
  },
  label: {
    fontWeight: 'bold',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const MedicalReportPDF = ({ reports }) => (
  <Document>
    {reports.map((report, index) => (
      <Page style={styles.page} key={index}>
        <Text style={styles.header}>Medical Report</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patient Details</Text>
          <View style={styles.container}>
            <Text style={styles.text}>
              <Text style={styles.label}>Name:</Text> {report.patient_id}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.label}>Status:</Text> {report.status}
            </Text>
          </View>
          <Text style={styles.text}>
            <Text style={styles.label}>Date:</Text> {report.appointment_date}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medical problem</Text>
          <Text style={styles.text}>{report.reason}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Priority</Text>
          <Text style={styles.text}>{report.priority}</Text>
        </View>
        <View style={styles.doctor}>
          <Text style={styles.sectionTitle}> Presiding Doctor</Text>
          <Text style={styles.text}> Dr : {report.doctor_id}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image src={exampleImage} style={styles.image} />
        </View>
        
      </Page>
      
    ))}
  </Document>
);

const MedicalReport = () => {
  const [reports, setReports] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const patID = location.state.patientId; // Assuming you're passing patID in location.state

    console.log("he is the pat id", patID)

    // Fetch data based on patID
    const fetchData = async () => {
        try {
            const authToken = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:10000/api/v2/appointment/fetch_appointments_history', {
              method: 'POST',
              headers: {
                'Authorization': `Token ${authToken}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ patient_id: patID }) // Assuming patID is already defined in your scope
            });
          
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
          
            const data = await response.json();
            console.log('respondedData:', data.appointments);
            setReports(data.appointments)
            // Further processing of data here
          } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error
          }
          
    };

    fetchData(); // Call fetchData function

  }, [location.state.patID]); // Execute useEffect when patID changes

  if (reports.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
     
      <PDFViewer width="100%" height="600">
        <MedicalReportPDF reports={reports} />
      </PDFViewer>
    </div>
  );
};

export default MedicalReport;
