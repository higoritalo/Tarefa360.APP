import { useEffect, useState } from "react";
import { Sidebar } from "../../componentes/sidebar/sidebar";
import { Topbar } from "../../componentes/sidebar/topbar/topbar";
import style from "./novoUsuario.module.css";
import { useNavigate } from "react-router-dom";
import UsuarioAPI from "../../services/usuarioAPI";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function NovoUsuario() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [tiposUsuarios, setTiposUsuarios] = useState([]);

    const navigate = useNavigate();

    // Busca os tipos de usuários na API.
    useEffect(() => {
        const fetchTiposUsuarios = async () => {
            try {
                const tipos = await UsuarioAPI.listarTiposUsuarioAsync();

                console.log("Tipos recebidos da API:", tipos);

                setTiposUsuarios(tipos);

            } catch (error) {
                console.error("Erro ao buscar tipos de usuários:", error);
            }
        };

        fetchTiposUsuarios();
    }, []);

    // Valida os campos e realiza o cadastro.
    const isFormValid = () => {
        return nome.trim() && email.trim() && senha.trim() && tipoUsuario;
    };

    // Envia os dados para a API.
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        try {
            await UsuarioAPI.criarAsync({
                nome,
                email,
                senha,
                tipoUsuario: Number(tipoUsuario)
            });

            alert("Usuário cadastrado com sucesso!");

            navigate('/usuarios');

        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);

            alert(
                error.response?.data || "Erro ao cadastrar usuário. Verifique a API."
            );
        }
    };

    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>

                    <h3>Novo Usuário</h3>

                    <Form onSubmit={handleSubmit}>

                        <Form.Group controlId="formNome" className="mb-3">
                            <Form.Label>Nome</Form.Label>

                            <Form.Control
                                type="text"
                                placeholder="Digite seu nome"
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
                                placeholder="Digite sua senha"
                                name="senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formTipoUsuario" className="mb-3">
                            <Form.Label>Tipo de Usuário</Form.Label>

                            <Form.Select
                                name="tipoUsuario"
                                value={tipoUsuario}
                                onChange={(e) => setTipoUsuario(e.target.value)}
                                required
                            >
                                <option value="">
                                    Selecione o tipo de usuário
                                </option>

                                {tiposUsuarios.map((tipo) => (
                                    <option key={tipo.id} value={tipo.id}>
                                        {tipo.descricao}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Salvar
                        </Button>

                    </Form>

                </div>
            </Topbar>
        </Sidebar>
    );
}
