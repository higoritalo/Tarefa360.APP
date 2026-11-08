import style from "./topbar.module.css";
import {Link} from "react-router-dom";
import {MdLogout} from "react-icons/md"

export function Topbar({children}){
    return(
        <div className={style.conteudo}>
            <div className={style.topbar_conteudo}>
                <Link to="/login" className={style.botao_deslogar}><MdLogout/></Link>
            </div>

            <div className={style.pagina_conteudo}>
                {children}
            </div>
        </div>
    )
}