import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Function to ping the server
export const pingServer = () => axios.get(`${BASE_URL}/ping`);

// Function to run the audit for a given URL
export const runAudit = async (url) => {
  try {
    const response = await axios.post(`${BASE_URL}/audit`, { url });
    console.log("Audit response", response.data);
    return response.data;  // Return only the data part from the response
  } catch (error) {
    console.error('Error running audit:', error);
    throw new Error('Error running audit');  // Throw an error if audit fails
  }
};

// Function to fetch the list of all reports
export const fetchReports = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/reports`);
    return Array.isArray(response.data) ? response.data : [];  // Return only the data part from the response
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw new Error('Error fetching reports');  // Throw an error if fetching fails
  }
};

