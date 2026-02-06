import axios from 'axios';

// KEEP YOUR API KEY HERE from env
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export const fetchDocContent = async (documentId) => {
  try {
    // We use the Drive API's 'export' endpoint to get raw HTML directly
    const response = await axios.get(
      `https://www.googleapis.com/drive/v3/files/${documentId}/export`,
      {
        params: {
          mimeType: 'text/html', // Ask Google to convert it to HTML for us
          key: API_KEY,
        },
      }
    );

    // The response is already HTML string! No parsing needed.
    return response.data; 

  } catch (error) {
    console.error("Drive API Error:", error);
    const msg = error.response?.data?.error?.message || error.message;
    return `<div style="color:red; padding:20px; border:1px solid red;">Error: ${msg}</div>`;
  }
};