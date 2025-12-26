import { ref } from "vue";

export const useValidations = () => {
    const errorMessage = ref<string>("");

    const validateFields = (data: any) => {
        errorMessage.value = "";

        if (!data.name || !data.img || !data.year || !data.director) {
            errorMessage.value = "Por favor, preencha todos os campos obrigatórios.";
            return false;
        }

        if (!data.img.startsWith("http")) {
            errorMessage.value = "A URL da imagem deve ser válida (começar com http).";
            return false;
        }

        if (data.notes < 0 || data.notes > 10) {
            errorMessage.value = "A nota deve estar entre 0 e 10.";
            return false;
        }

        const currentYear = new Date().getFullYear();
        if (data.year > currentYear + 5) {
            errorMessage.value = "O ano informado é inválido.";
            return false;
        }

        return true;
    };

    return {
        errorMessage,
        validateFields
    };
};