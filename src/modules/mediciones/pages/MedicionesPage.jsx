import MedicionesTable from "../components/MedicionesTable";

import { getLecturas, removeLectura } from "../../../services/LecturasServices";
import { useEffect, useState } from "react";
import {Dropdown} from 'primereact/dropdown';
import { tipoMedidaList } from "../../../utils/listForm";

export function MedicionesPage (){

    const [mediciones, setMediciones] = useState([])
    const [medicionesOriginales, setMedicionesOriginales] = useState([])
    const [filtro, setFiltro] = useState(null);

    useEffect(()=>{
        reiniciarDatos()
    },[])

    useEffect(() => {
        if (filtro == null) {
            setMediciones(medicionesOriginales);
        } else {
            setMediciones(medicionesOriginales.filter(me => me.tipoMedida === filtro));
        }
    }, [filtro, medicionesOriginales]);

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
        console.log("asdasd");
        removeLectura(lectura);
        reiniciarDatos()
    }

    return (
        <>
        <div className="d-flex flex-column gap-2 mb-2">
            <label className="text-start" htmlFor="form-pelicula">Filtro por película</label>
            <div className="d-flex gap-2">
                <Dropdown className='w-100' id="form-pelicula" value={filtro} onChange={e=>setFiltro(e.value)} options={tipoMedidaList.map(p => p.nombre)} optionLabel="dia"
                    placeholder="Selecciona una pelicula" checkmark={true} highlightOnSelect={false}/>
                <p onClick={borrarFiltro}>Limpiar</p>
            </div>
        </div>
        <MedicionesTable lecturas={mediciones} removeLectura={eliminarLectura}/>
        </>
    )
}
