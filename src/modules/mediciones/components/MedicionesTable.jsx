
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { Button } from 'primereact/button';
import { tipoMedidaList } from '../../../utils/listForm';


function MedicionesTable ({lecturas, removeLectura = () => {}}){

    const accionesTemplate = (lectura) => {
        return <Button severity='dange' label='Descartar lectura' onClick={()=> removeLectura(lectura)}></Button>
    }

    const fechaTemplate = (lectura) => {
        return lectura.fechaHora.split(',')[0]
    }
    const horaTemplate = (lectura) => {
        return lectura.fechaHora.split(',')[1]
    }

    const valorTemplate = (lectura) => {
        const medida = tipoMedidaList.find(m => m.nombre == lectura.tipoMedida);
        return medida ? `${lectura.valor} ${medida.abreviatura}` : `${lectura.valor}`
    }

    return (
        <div>
            <DataTable value={lecturas} tableStyle={{minWidth:'50rem'}}>
                <Column body={fechaTemplate} header="Fecha"></Column>
                <Column body={horaTemplate} header="Hora"></Column>
                <Column field='medidor' header="Medidor"></Column>
                <Column body={valorTemplate} header="Valor"></Column>
                <Column header='Acciones' body={accionesTemplate}></Column>
            </DataTable>
        </div>
    )
}

export default MedicionesTable;