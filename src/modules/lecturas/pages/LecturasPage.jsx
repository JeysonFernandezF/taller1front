
import { Panel } from "primereact/panel";
import Form from "../components/Form";

import { createLectura } from "../../../services/LecturasServices";
import { useNavigate } from "react-router";
        
        
function LecturasPage() {
    let navigate = useNavigate();
    const guardarLectura = (lectura) => {
        createLectura(lectura);
        navigate("/mediciones");
    }
    
    return(
        <Panel header="Registar lecturas"> 
            <Form onCreateLectura={guardarLectura} />
        </Panel>
    )

}

export default LecturasPage;