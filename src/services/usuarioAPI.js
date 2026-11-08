import { HTTPClient } from "./client";

const UsuarioAPI = {
    async obterAsync(usuarioId){
        try{
            const response = await HTTPClient.get(`/Usuario/Obter/${usuarioId}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao obter usuário:", error);
            throw error;
            }
    },
    
    async listarAsync(){
    try{
        const response = await HTTPClient.get(`/api/Usuario/Listar`);
        return response.data;
    } catch (error) {
        console.error("Erro ao listar usuários:", error);
        throw error;
    }
},
    
    async criarAsync(usuario){
    try{
        const usuarioCriar = {
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha,
            tipoUsuario: Number(usuario.tipoUsuario)
        };

        const response = await HTTPClient.post(
            `/api/Usuario/Criar`,
            usuarioCriar
        );

        return response.data;

    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        throw error;
    }
},
    
    async atualizarAsync(id, nome, email, tipoUsuario){
    try{
        const usuarioAtualizar = {
            id: id,
            nome: nome,
            email: email,
            tipoUsuario: Number(tipoUsuario)
        };

        const response = await HTTPClient.put(
            `/api/Usuario/Atualizar`,
            usuarioAtualizar
        );

        return response.data;

    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        throw error;
    }
},

    async deletarAsync(usuarioId) {
    try {
        const response = await HTTPClient.delete(
            `/api/Usuario/Excluir/${usuarioId}`
        );

        return response.data;

    } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        throw error;
    }
},

    async listarTiposUsuarioAsync(){
    try{
        const response = await HTTPClient.get(`/api/Usuario/ListarTiposUsuario`);
        return response.data;
    } catch (error) {
        console.error("Erro ao listar tipos de usuário:", error);
        throw error;
    }
},

    async alterarSenhaAsync(id, senha, senhaAntiga){
        try{
            const usuarioAlterarSenha = {
                Id: id,
                Senha: senha,
                senhaAntiga: senhaAntiga
            };
            const response = await HTTPClient.put(`/Usuario/AlterarSenha`, usuarioAlterarSenha);
            return response.data;
        } catch (error) {
            console.error("Erro ao alterar senha do usuário:", error);
            throw error;
            }
    },

    async restaurarAsync(usuarioId){
        try{
            const response = await HTTPClient.put(`/Usuario/Restaurar/${usuarioId}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao restaurar usuário:", error);
            throw error;
            }
    },

}

export default UsuarioAPI;