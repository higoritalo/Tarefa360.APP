import { useEffect, useState } from "react";
import { Sidebar } from "../../componentes/sidebar/sidebar";
import { Topbar } from "../../componentes/sidebar/topbar/topbar";
import style from "../novoUsuario/novoUsuario.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import UsuarioAPI from "../../services/usuarioAPI";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function EditarUsuario() {

    const location = useLocation();
    const navigate = useNavigate();

    const usuario = location.state;

    const [nome, setNome] = useState(usuario?.nome || "");
    const [email, setEmail] = useState(usuario?.email || "");
    const [tipoUsuario, setTipoUsuario] = useState(
        String(usuario?.tipoUsuario || "")
    );
    const [tiposUsuarios, setTiposUsuarios] = useState([]);

    // Busca os tipos de usuários na API.
    useEffect(() => {
        const buscarTipos = async () => {
            try {
                const tipos = await UsuarioAPI.listarTiposUsuarioAsync();
                setTiposUsuarios(tipos);
            } catch (error) {
                console.error("Erro ao buscar tipos:", error);
            }
        };

        buscarTipos();
    }, []);

    // Valida e envia os dados atualizados.
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nome.trim() || !email.trim() || !tipoUsuario) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            await UsuarioAPI.atualizarAsync(
                usuario.id,
                nome,
                email,
                tipoUsuario
            );

            alert("Usuário atualizado com sucesso!");

            navigate("/usuarios");

        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);

            alert(
                error.response?.data || "Erro ao atualizar usuário."
            );
        }
    };

    // Verifica se o usuário foi recebido.
    if (!usuario) {
        return <p>Usuário não encontrado. Volte à lista de usuários.</p>;
    }

    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>

                    <h3>Editar Usuário</h3>

                    <Form onSubmit={handleSubmit}>

                        <Form.Group controlId="formNome" className="mb-3">
                            <Form.Label>Nome</Form.Label>

                            <Form.Control
                                type="text"
                                placeholder="Digite o nome"
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
                                placeholder="Digite o email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                            Atualizar
                        </Button>

                    </Form>

                </div>
            </Topbar>
        </Sidebar>
    );
}