import { Sidebar } from "../../componentes/sidebar/sidebar";
import { Topbar } from "../../componentes/sidebar/topbar/topbar";
import style from "./home.module.css";

export function Home(){
    return(
        <div className={style.conteudo}>
            <Sidebar>
                <Topbar>
                    <div className={style.pagina_conteudo}>
                        <h3>Home</h3>
                    </div>
                </Topbar>
            </Sidebar>
        </div>
    )
}