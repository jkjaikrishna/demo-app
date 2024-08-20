import { google } from 'googleapis';

// Load credentials from service account JSON file
import serviceAccount from '../../google-sheet-service-account.json.json';

// Setup Google Sheets API client
const sheets = google.sheets('v4');

const saveToGoogleSheet = async (profileData) => {
  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const client = await auth.getClient();

  const spreadsheetId = '1c4XQoR79x3kL_YdjYgKEsiOKLejkDl98gtAPdAtSf5Q'; // Replace with your Google Sheet ID
  const range = 'Sheet1!A2:F2'; // Adjust range according to your sheet structure

  const request = {
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [
        [
          profileData.email,
          profileData.username,
          profileData.password,
          profileData.dob,
          profileData.gender,
          profileData.address,
          profileData.mobile,
        ],
      ],
    },
    auth: client,
  };

  try {
    const response = await sheets.spreadsheets.values.append(request);
    console.log('Data saved to Google Sheet:', response.data);
  } catch (error) {
    console.error('Error saving data to Google Sheet:', error);
  }
};

export default saveToGoogleSheet;
