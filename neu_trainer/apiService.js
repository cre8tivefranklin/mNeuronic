// apiService.js
// //api testing:
// curl \
//   -H 'Content-Type: application/json' \
//   -d '{"contents":[{"parts":[{"text":"Explain how AI works"}]}]}' \
//   -X POST 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBU264g39c0P2fxQs5pNt3r0mfKUJg6KxU'


import axios from 'axios';

const apiKey = 'AIzaSyBU264g39c0P2fxQs5pNt3r0mfKUJg6KxU'; // Replace with your actual Google Cloud API key
const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export const getMnemonicResponse = async (inputText) => {
  const requestData = {
    contents: [
      {
        parts: [
          {
            text: inputText,
          },
        ],
      },
    ],
  };

  try {
    const response = await axios.post(`${endpoint}?key=${apiKey}`, requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    // Log more details of the error
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      // Request was made but no response was received
      console.error('Error request data:', error.request);
    } else {
      // Something else happened in setting up the request
      console.error('Error message:', error.message);
    }
    throw new Error(`Error fetching data: ${error.message}`);
  }
};
