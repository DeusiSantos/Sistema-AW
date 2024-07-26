import { FireFilled } from "@ant-design/icons"
import image from "./img/LogoSlim.png"

const Logo = () => {
    return(
        <div className="logo">
            <div className="logo-icon">
                <img src={image} alt="" className=" w-[50px]" />
            </div>
        </div>
    )
}

export default Logo;