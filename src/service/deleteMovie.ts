import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const deleteMovie = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao deletar filme:", error);
        throw error;
    }
};

export default deleteMovie;