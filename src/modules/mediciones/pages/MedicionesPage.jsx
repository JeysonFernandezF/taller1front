import MedicionesTable from "../components/MedicionesTable";

import { getLecturas, removeLectura } from "../../../services/LecturasServices";
import { useEffect, useState } from "react";
import {Dropdown} from 'primereact/dropdown';
import { tipoMedidaList } from "../../../utils/listForm";
import { Button } from 'primereact/button';

export function MedicionesPage (){

    const [mediciones, setMediciones] = useState([])
    const [medicionesOriginales, setMedicionesOriginales] = useState([])
    const [filtro, setFiltro] = useState(null);

    useEffect(()=>{
        reiniciarDatos()
    },[])

    const activarFiltro = () => {
        if(filtro == null) return false;
        setMediciones(medicionesOriginales.filter(me => me.tipoMedida === filtro));
    }

    const borrarFiltro = () => {
        setFiltro(null);
        reiniciarDatos()
    }

    const reiniciarDatos = () => {
        const datos = getLecturas();
        setMedicionesOriginales(datos);
        setMediciones(datos);
    }

    const eliminarLectura = (lectura) => {
        removeLectura(lectura);
        reiniciarDatos()
    }

    return (
        <>
        <div className="d-flex flex-column gap-2 mb-2">
            <label className="text-start" htmlFor="form-tipo-medida">Filtro por tipo de medida</label>
            <div className="d-flex gap-2">
                <Dropdown className='w-100' id="form-tipo-medida" value={filtro} onChange={e=>setFiltro(e.value)} options={tipoMedidaList.map(p => p.nombre)} optionLabel="dia"
                    placeholder="Selecciona una tipo de medida" checkmark={true} highlightOnSelect={false}/>
                <Button label="Filtrar" severity="primary" onClick={activarFiltro}></Button>
                <Button label="Limpiar" severity="warning" onClick={borrarFiltro}></Button>
            </div>
        </div>
        <MedicionesTable lecturas={mediciones} removeLectura={eliminarLectura}/>
        </>
    )
}
