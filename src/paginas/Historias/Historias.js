import { Link } from "react-router-dom";
import { Sidebar } from "../../componentes/sidebar/sidebar";
import { Topbar } from "../../componentes/sidebar/topbar/topbar";
import style from "./Historias.module.css"
import { Table } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { MdEdit, MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import HistoriaAPI from "../../services/historiaAPI";


export function Historias() {
  const [historias, setHistorias] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [historiaSelecionado, setHistoriaSelecionado] = useState(null);

  const clickDeletarHistoria = (historia) => {
    setHistoriaSelecionado(historia);
    setMostrarModal(true);
  };

  const deletarHistoria = async () => {
    try {
      await HistoriaAPI.deletarHistoriaAsync(historiaSelecionado.id);
      setHistorias(historias.filter((h) => h.id !== historiaSelecionado.id));
    } catch (error) {
      console.error("Erro ao deletar história: ", error);
    } finally {
      handleFecharModal();
    }
  };

  const handleFecharModal = () => {
    setMostrarModal(false);
    setHistoriaSelecionado(null);
  };

  async function carregarHistorias() {
    try {
      const listaHistorias = await HistoriaAPI.listarHistoriasAsync(true);
      setHistorias(listaHistorias);
    } catch (error) {
      console.error("Erro ao carregar histórias: ", error);
    }
  }

  useEffect(() => {
    carregarHistorias();
  }, []);

  return (
    <Sidebar>
      <Topbar>
        <div className={style.pagina_conteudo}>
          <div className={style.pagina_cabecalho}>
            <h3>Histórias</h3>
            <Link to="/historia/novo" className={style.botao_novo}>
              + Novo
            </Link>
          </div>

          <div className={style.tabela}>
            <Table responsive>
              <thead className={style.tabela_cabecalho}>
                <tr>
                  <th>Nome</th>
                  <th>Projeto</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody className={style.tabela_corpo}>
                {historias.map((historia) => (
                  <tr key={historia.id}>
                    <td>{historia.nome}</td>
                    <td>{historia.projeto}</td>
                    <td>
                      <Link
                        to="/historia/editar"
                        state={historia.id}
                        className={style.botao_editar}
                      >
                        <MdEdit />
                      </Link>
                      <button
                        onClick={() => clickDeletarHistoria(historia)}
                        className={style.botao_deletar}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <Modal show={mostrarModal} onHide={handleFecharModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Tem certeza que deseja deletar o usuário{" "}
              {historiaSelecionado?.nome}?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleFecharModal}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={deletarHistoria}>
                Deletar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Topbar>
    </Sidebar>
  );
}
