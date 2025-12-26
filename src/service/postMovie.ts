import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const postMovie = async (movieData: any) => {
    try {
        const response = await axios.post(API_URL, movieData);
        return response.data;
    } catch (error: any) {
        console.error("Erro ao adicionar filme no banco:", error.response?.data || error.message);
        throw error;
    }
}

export default postMovie;