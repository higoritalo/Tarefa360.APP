import { HTTPClient } from "./client";

const HistoriaAPI = {
    async obterAsync(historiaId) {
        try {
            const response = await HTTPClient.get(`api/Historias/Obter/${historiaId}`)
            return response.data;
        } catch (error) {
            console.error("Erro ao obter história: ", error);
            throw error;
        }
    },

    async listarHistoriasAsync(ativos) {
        try {
            const response = await HTTPClient.get(`api/Historias/Listar?ativos=${ativos}`)
            return response.data;
        } catch (error) {
            console.error("Erro ao listar histórias: ", error);
            throw error;
        }
    },

    async criarHistoriaAsync(nome, historias, descricao){
        try {
            const historiaCriar = {
                nome: nome,
                historias: historias,
                descricao: descricao,
            };
            const response = await HTTPClient.post(`api/Historias/Criar`, historiaCriar)
            return response.data;
        } catch (error) {
            console.error("Erro ao criar história: ", error);
            throw error;
        }
    },

    async editarHistoriaAsync(id, nome, historias, descricao){
        try {
            const historiaEditar = {
                id: id,
                nome: nome,
                historias: historias,
                descricao: descricao,
            };
            const response = await HTTPClient.put(`api/Historias/Editar`, historiaEditar)
            return response.data
        } catch (error) {
            console.error("Erro ao editar história: ", error);
            throw error;
        }
    },

    async deletarHistoriaAsync(historiaId){
        try {
            const response = await HTTPClient.delete(`api/Historias/Deletar/${historiaId}`)
            return response.data
        } catch (error) {
            console.error("Erro ao deletar história: ", error);
            throw error;
        }
    },

    async listarTiposHistoriasAsync(){
        try {
            const response = await HTTPClient.get(`/api/Historias/ListarTiposHistoria`);
            return response.data;
        } catch (error) {
            console.error("Erro ao listar tipos de história: ", error);
            throw error;
        }
    }
}

export default HistoriaAPI;