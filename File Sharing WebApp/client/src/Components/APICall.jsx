import axios from 'axios';

export const uploadFile = async (data) => {
    try {
        const response = await axios.post("http://localhost:8082/upload", data);
        console.log("File uploaded successfully:", response.data);
        return response.data; // Return the data if needed by the calling component
    } catch (error) {
        console.error("Error uploading file:", error.message);
        throw error; // Rethrow the error to be caught by the calling component
    }
};