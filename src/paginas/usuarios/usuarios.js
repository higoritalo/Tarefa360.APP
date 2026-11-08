import { Link } from "react-router-dom";
import { Sidebar } from "../../componentes/sidebar/sidebar";
import { Topbar } from "../../componentes/sidebar/topbar/topbar";
import style from "./usuarios.module.css";
import { Table, Modal, Button } from "react-bootstrap";
import { MdEdit, MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import UsuarioAPI from "../../services/usuarioAPI";

export function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

  // Carrega os usuários cadastrados.
  async function carregarUsuarios() {
    try {
      const listaUsuarios = await UsuarioAPI.listarAsync();
      setUsuarios(listaUsuarios);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      setUsuarios([]);
    }
  }

  // Abre o modal e seleciona o usuário.
  function handleClickDeletar(usuario) {
    setUsuarioSelecionado(usuario);
    setMostrarModal(true);
  }

  // Realiza a exclusão do usuário.
  async function handleDeletar() {
    if (!usuarioSelecionado) {
      return;
    }

    try {
      await UsuarioAPI.deletarAsync(usuarioSelecionado.id);

      // Atualiza a lista sem recarregar a página.
      setUsuarios((listaAtual) =>
        listaAtual.filter((usuario) => usuario.id !== usuarioSelecionado.id),
      );

      setMostrarModal(false);
      setUsuarioSelecionado(null);
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      alert("Não foi possível excluir o usuário.");
    }
  }

  // Fecha o modal.
  function handleFecharModal() {
    setMostrarModal(false);
    setUsuarioSelecionado(null);
  }

  // Carrega os usuários ao abrir a página.
  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <>
      <Sidebar>
        <Topbar>
          <div className={style.pagina_conteudo}>
            <div className={style.pagina_cabecalho}>
              <h3>Usuários</h3>

              <Link to="/usuario/novo" className={style.botao_novo}>
                + Novo
              </Link>
            </div>

            <div className={style.tabela}>
              <Table responsive>
                <thead className={style.tabela_cabecalho}>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody className={style.tabela_corpo}>
                  {usuarios.length > 0 ? (
                    usuarios.map((usuario) => (
                      <tr key={usuario.id}>
                        <td>{usuario.nome}</td>

                        <td>{usuario.email}</td>

                        <td>
                          {/* Botão de edição. */}
                          <Link
                            to="/usuario/editar"
                            state={usuario}
                            className={style.botao_editar}
                          >
                            <MdEdit />
                          </Link>

                          {/* Botão de exclusão. */}
                          <button
                            type="button"
                            onClick={() => handleClickDeletar(usuario)}
                            className={style.botao_deletar}
                          >
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">Nenhum usuário cadastrado.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </Topbar>
      </Sidebar>

      {/* Modal de confirmação de exclusão. */}
      <Modal show={mostrarModal} onHide={handleFecharModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar exclusão</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Tem certeza que deseja excluir o usuário{" "}
          <strong>{usuarioSelecionado?.nome}</strong>?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleFecharModal}>
            Cancelar
          </Button>

          <Button variant="danger" onClick={handleDeletar}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
