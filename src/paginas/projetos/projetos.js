import { Sidebar } from "../../componentes/sidebar/sidebar";
import { Topbar } from "../../componentes/sidebar/topbar/topbar";
import style from "./projetos.module.css";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { MdEdit, MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import ProjetoAPI from "../../services/projetoAPI";

export function Projetos() {
  const [projetos, setProjetos] = useState([]);
  const [filtro, setFiltro] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalExcluir, setMostrarModalExcluir] = useState(false);

  const [projetoSelecionado, setProjetoSelecionado] = useState(null);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  // Carrega os projetos da API.
  async function carregarProjetos() {
    try {
      const lista = await ProjetoAPI.listarAsync();
      setProjetos(lista);
    } catch (error) {
      console.error("Erro ao carregar projetos:", error);
      setProjetos([]);
    }
  }

  // Abre o modal para cadastrar um novo projeto.
  function handleNovo() {
    setProjetoSelecionado(null);
    setNome("");
    setDescricao("");
    setMostrarModal(true);
  }

  // Abre o modal para editar um projeto.
  function handleEditar(projeto) {
    setProjetoSelecionado(projeto);
    setNome(projeto.nome);
    setDescricao(projeto.descricao || "");
    setMostrarModal(true);
  }

  // Salva um novo projeto ou edita um projeto existente.
  async function handleSalvar(event) {
    event.preventDefault();

    const projeto = {
      nome: nome.trim(),
      descricao: descricao.trim(),
    };

    try {
      if (projetoSelecionado) {
        await ProjetoAPI.editarAsync(projetoSelecionado.id, projeto);
      } else {
        await ProjetoAPI.criarAsync(projeto);
      }

      setMostrarModal(false);
      setProjetoSelecionado(null);
      setNome("");
      setDescricao("");

      await carregarProjetos();
    } catch (error) {
      console.error("Erro ao salvar projeto:", error);
      alert("Não foi possível salvar o projeto.");
    }
  }

  // Abre a confirmação de exclusão.
  function handleClickExcluir(projeto) {
    setProjetoSelecionado(projeto);
    setMostrarModalExcluir(true);
  }

  // Exclui o projeto.
  async function handleExcluir() {
    if (!projetoSelecionado) {
      return;
    }

    try {
      await ProjetoAPI.excluirAsync(projetoSelecionado.id);

      setProjetos((listaAtual) =>
        listaAtual.filter((projeto) => projeto.id !== projetoSelecionado.id),
      );

      setMostrarModalExcluir(false);
      setProjetoSelecionado(null);
    } catch (error) {
      console.error("Erro ao excluir projeto:", error);
      alert("Não foi possível excluir o projeto.");
    }
  }

  // Fecha o modal de cadastro/edição.
  function handleFecharModal() {
    setMostrarModal(false);
    setProjetoSelecionado(null);
  }

  // Fecha o modal de exclusão.
  function handleFecharModalExcluir() {
    setMostrarModalExcluir(false);
    setProjetoSelecionado(null);
  }

  // Carrega os projetos ao abrir a página.
  useEffect(() => {
    carregarProjetos();
  }, []);

  // Filtra os projetos pelo nome.
  const projetosFiltrados = projetos.filter((projeto) =>
    projeto.nome.toLowerCase().includes(filtro.toLowerCase()),
  );

  return (
    <>
      <Sidebar>
        <Topbar>
          <div className={style.pagina_conteudo}>
            {/* Cabeçalho */}
            <div className={style.pagina_cabecalho}>
              <h3>Projetos</h3>

              <Button className={style.botao_novo} onClick={handleNovo}>
                + Novo
              </Button>
            </div>

            {/* Filtro */}
            <div className={style.filtro}>
              <Form.Control
                type="text"
                placeholder="Pesquisar projeto"
                value={filtro}
                onChange={(event) => setFiltro(event.target.value)}
              />

              {filtro && (
                <button
                  type="button"
                  className={style.botao_limpar}
                  onClick={() => setFiltro("")}
                >
                  ×
                </button>
              )}
            </div>

            {/* Tabela */}
            <div className={style.tabela}>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th className={style.coluna_acoes}>Ações</th>
                  </tr>
                </thead>

                <tbody className={style.tabela_corpo}>
                  {projetosFiltrados.length > 0 ? (
                    projetosFiltrados.map((projeto) => (
                      <tr key={projeto.id}>
                        <td>{projeto.nome}</td>

                        <td className={style.coluna_acoes}>
                          {/* Editar */}
                          <button
                            type="button"
                            onClick={() => handleEditar(projeto)}
                            className={style.botao_editar}
                          >
                            <MdEdit />
                          </button>

                          {/* Excluir */}
                          <button
                            type="button"
                            onClick={() => handleClickExcluir(projeto)}
                            className={style.botao_deletar}
                          >
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">Nenhum projeto encontrado.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </Topbar>
      </Sidebar>

      {/* Modal de cadastro/edição */}
      <Modal show={mostrarModal} onHide={handleFecharModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {projetoSelecionado ? "Editar projeto" : "Novo projeto"}
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSalvar}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nome do projeto</Form.Label>

              <Form.Control
                type="text"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Descrição</Form.Label>

              <Form.Control
                as="textarea"
                rows={3}
                value={descricao}
                onChange={(event) => setDescricao(event.target.value)}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleFecharModal}>
              Cancelar
            </Button>

            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal de confirmação de exclusão */}
      <Modal
        show={mostrarModalExcluir}
        onHide={handleFecharModalExcluir}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar exclusão</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Tem certeza que deseja excluir o projeto{" "}
          <strong>{projetoSelecionado?.nome}</strong>?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleFecharModalExcluir}>
            Cancelar
          </Button>

          <Button variant="danger" onClick={handleExcluir}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
