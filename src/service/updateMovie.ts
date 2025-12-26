import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const updateMovie = async (id: string, movieData: any) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, movieData);
        return response.data;
    } catch (error: any) {
        console.error("Erro ao atualizar filme:", error);
        throw error;
    }
}

export default updateMovie;