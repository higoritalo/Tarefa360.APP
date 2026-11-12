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
    const[historia, setHistoria] = useState([]);
    const[historiaSelecionada, setHistoriaSelecionada] = useState('');
    const[descricao, setDescricao] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTipoHistoria = async () => {
            try {
                const tipos = await HistoriaAPI.listarTiposHistoriasAsync();
                setHistoria(tipos)
            } catch (error) {
                console.error("Erro ao buscar tipos de histórias: ", error);
            }
        };

        fetchTipoHistoria();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            alert("Por favor, preencha todos os campos!");
            return
        }

        try {
            await HistoriaAPI.criarHistoriaAsync(nome, historiaSelecionada, descricao
            );

            alert("História cadastrada com sucesso!");

            navigate('/historias')
        } catch (error) {
            console.error("Erro ao cadastrar uma história: ", error);

            alert(
                error.response?.data || "Erro ao cadastrar história. Verifique a API. "
            )
        }
    }

    const isFormValid = () => {
        return nome && historiaSelecionada && descricao;
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

                        <Form.Group controlId="formHistoria"
                        className="mb-3">
                            <Form.Label>História</Form.Label>
                            <Form.Select
                                name="historia"
                                value={historiaSelecionada}
                                onChange={(e) => setHistoriaSelecionada(e.target.value)}
                                required
                            >
                                <option value="">
                                    Selecione....
                                </option>

                                {historia.map((historia) => (
                                    <option key={historia.id}
                                    value={historia.id}>
                                        {historia.nome}
                                    </option>
                                ))}
                                </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formDescricao" className="mb-3">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Digite a descrição da história"
                                    name="descricao"
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    required
                                />
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