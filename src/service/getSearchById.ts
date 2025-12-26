import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getSearchById = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error: any | undefined) {
        console.error("Erro ao procurar por ID")
        throw error;
    }
}

export default getSearchById;