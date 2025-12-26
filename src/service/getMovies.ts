import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getMovies = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error: undefined | any) {
        console.error("Erro ao listar filmes:", error);
        throw error;
    }
};

export default getMovies;