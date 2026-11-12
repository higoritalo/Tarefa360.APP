import { HTTPClient } from "./client";

const ProjetoAPI = {
  // Listar projetos
  async listarAsync() {
    try {
      const response = await HTTPClient.get("/api/Projeto");
      return response.data;
    } catch (error) {
      console.error("Erro ao listar projetos:", error);
      throw error;
    }
  },

  // Criar projeto
  async criarAsync(projeto) {
    try {
      const response = await HTTPClient.post("/api/Projeto", projeto);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
      throw error;
    }
  },

  // Obter projeto por ID
  async obterPorIdAsync(id) {
    try {
      const response = await HTTPClient.get(`/api/Projeto/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter projeto:", error);
      throw error;
    }
  },

  // Editar projeto
  async editarAsync(id, projeto) {
    try {
      const response = await HTTPClient.put(`/api/Projeto/${id}`, projeto);
      return response.data;
    } catch (error) {
      console.error("Erro ao editar projeto:", error);
      throw error;
    }
  },

  // Excluir projeto
  async excluirAsync(id) {
    try {
      const response = await HTTPClient.delete(`/api/Projeto/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao excluir projeto:", error);
      throw error;
    }
  },
};

export default ProjetoAPI;
