import { Link } from "react-router-dom";
import Page404 from "../components/img/404.svg";
import { Button } from "antd";

const PageNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <img src={Page404} alt="Página não encontrada" className="mb-8" />

            <p className="text-xl font-bold mb-4">Oops! Página não encontrada</p>

            <p className="text-gray-600 mb-8">A página que você está procurando pode ter sido removida ou não está disponível temporariamente.</p>

            <Link to="/">
                <Button type="primary" style={{ backgroundColor: "#F20C1F", borderColor: "#F20C1F" }}>Voltar para a página inicial</Button>
            </Link>
        </div>
    );
};

export default PageNotFound;
