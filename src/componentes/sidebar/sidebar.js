import style from "./sidebar.module.css";
import Logo from"../../assets/LogoBranco.png";
import { SideBarItem } from "../sidebarItem/sidebarItem";
import { MdOutlineSort } from "react-icons/md";
import { MdGroup } from "react-icons/md"

export function Sidebar({children}){
    return(
        <div>
            <div className={style.sidebar_conteudo}>
                <div className={style.sidebar_header}>
                    <img src={Logo} alt="Logo-Tarefa360" className={style.logo}/>

                    <hr className={style.linha}/>
                </div>

                <div className={style.sidebar_corpo}>
                    <SideBarItem texto="Usuários" link="/usuarios" logo={<MdGroup/>}/>
                </div>

                <div className={style.sidebar_corpo}>
                    <SideBarItem texto="Histórias" link="/historias" logo={<MdOutlineSort/>}/>
                </div>
            </div>

            <div className={style.pagina_conteudo}>
                {children}
            </div>
        </div>
    )
}