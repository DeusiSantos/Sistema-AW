
import { Button, Switch } from "antd";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi"
import { FaMoon, FaSun } from 'react-icons/fa'
import TopBar from "./NewTopBar";

const MudarTemaMenu = ({ darkTheme, MudarTema }) => {

    return (
        <div className="MudarTema text-center ">
            <Button type="primary" onClick={MudarTema}>
                {darkTheme ? <HiOutlineSun /> : <HiOutlineMoon />}
            </Button>
        </div>
    )

}

export default MudarTemaMenu;