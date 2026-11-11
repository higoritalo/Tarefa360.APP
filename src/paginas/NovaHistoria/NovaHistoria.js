import { useEffect, useState } from "react";
import { Sidebar } from "../../componentes/sidebar/sidebar";
import { Topbar } from "../../componentes/sidebar/topbar/topbar";
import style from "./NovaHistoria.module.css";
import { useNavigate } from "react-router-dom";
import HistoriaAPI from "../../services/historiaAPI";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function NovaHistoria() {
    const[nome, setNome] = useState('');
    const[projetos, setTiposProjeto] = useState('');
    const[projetoSelecionado, setProjetoSelecionado] = useState('');
    const[descricao, setDescricao] = useState('');
    const[tipoHistoriaId, setTipoHistoriaId] = useState('');

    useEffect(() => {
        const fetchTiposProjeto = async () => {
            try {
                const tipos = await HistoriaAPI.listarTiposHistoriasAsync();
                setTiposProjeto(tipos)
            } catch (error) {
                console.error("Erro ao buscar tipos de histórias: ", error);
            }
        };

        fetchTiposProjeto();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            await HistoriaAPI.criarHistoriaAsync(nome, projetos, descricao, tipoHistoriaId);
            navigate('/historias')
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    };

    const isFormValid = () => {
        return nome, projetos, descricao, tipoHistoriaId;
    };

    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <h3>Nova História</h3>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNome" className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control 
                                type="text"
                                placeholder="Digite o nome da história"
                                name="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email"
                                placeholder="Digite seu email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formSenha" className="mb-3">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control 
                                type="password"
                                placeholder="******"
                                name="senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formTipoUsuario" className="mb-3">
                            <Form.Label>Tipo de Usuário</Form.Label>
                            <Form.Control 
                                as="select"
                                name="tipoUsuario"
                                value={tipoUsuario}
                                onChange={(e) => setTipoUsuario(e.target.value)}
                                required
                            >
                                <option value="">Selecione o tipo de usuário</option>
                                {TiposUsuarios.map((tipo) => (
                                    <option value={tipo.id}>{tipo.nome}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit"  disabled={!isFormValid()}>
                            Salvar
                        </Button>

                    </Form>
                </div>
            </Topbar>
        </Sidebar>
    )

}