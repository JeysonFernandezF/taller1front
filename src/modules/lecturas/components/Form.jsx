import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import {SelectButton} from 'primereact/selectbutton';
import {Dropdown} from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { ListBox } from 'primereact/listbox';
import { RadioButton } from "primereact/radiobutton";
import { Calendar } from 'primereact/calendar';
import { Editor } from "primereact/editor";
import { medidorList} from "./../../../utils/listForm";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { formatearFecha } from "../../../utils/fomatearFecha";
import { medidorList, tipoMedidaList} from "./../../../utils/listForm";


function Form ({onCreateLectura = (lectura) => {}}) {
    const toast = useRef(null);

    const [fechaHora, setFechaHora] = useState(null);
    const [medidor, setMedidor] = useState('');
    const [direccion, setDireccion] = useState('');
    const [valor, setValor]= useState(1);
    const [tipoMedida, setTipoMedida] = useState('');

    
    const resetForm = () => {
        setFechaHora(null)
        setMedidor('')
        setDireccion('')
        setValor(1)
        setTipoMedida('')
    }
    const handleClick = () => {
        const nuevaLectura = validarFormulario(); 
        if(nuevaLectura) {
            onCreateLectura(nuevaLectura);
            resetForm();
            return; 
        }
    }
    

    const validarFormulario = () => {
        const errores = []
        if (!fechaHora || !(fechaHora instanceof Date)) {
            errores.push("El campo fecha no es válido.");
        }
        if(medidor == '' || medidor == null){
            errores.push('El campo medidor no es válido.')
        }
        if(direccion == '' || direccion == null){
            errores.push('El campo dirección no es válido.')
        }
        if(valor < 0 || valor > 500){
            errores.push('El campo valor no es válido.')
        }
         if(tipoMedida == '' || tipoMedida == null){
            errores.push('El campo tipo de medida no es válido.')
        }

       if(errores.length > 0){
            toast.current.show({
                severity: "error",
                summary: "Errores",
                content: () => (
                    <div className="flex flex-column gap-1" style={{ flex: 1 }}>
                        <p>Errores</p>
                        {errores.map((e, idx) => (
                            <div key={idx}>• {e}</div>
                        ))}
                    </div>
                )
            });
            return null;
        }


        return {
            fechaHora: formatearFecha(fechaHora),
            medidor,
            direccion,
            valor,
            tipoMedida,}
    }

    return (
        <>
            <Toast ref={toast} />
            <div className="d-flex flex-column align-items-start mb-3 gap-2">
                <label htmlFor="calendar-24h">Fecha y Hora</label>
                <Calendar id="calendar-24h" value={fechaHora} onChange={(e) => setFechaHora(e.value)} showTime hourFormat="24" dateFormat="dd-mm-yy" placeholder="dd-MM-yyyy HH:mm" />
            </div>
            <div className="d-flex flex-column align-items-start mb-3 gap-2">
                <label htmlFor="form-medidor">Medidor</label>
                <Dropdown className='w-100' id="form-medidor" value={medidor} onChange={e=>setMedidor(e.value)} options={medidorList} optionLabel="medidor"
                    placeholder="Seleccionar un medidor" checkmark={true} highlightOnSelect={false}/>
            </div>
            <div className="d-flex flex-column align-items-start mb-3 gap-2">
                <label htmlFor="form-direccion">Dirección</label>
                <Editor value={direccion} onTextChange={(e) => setDireccion(e.htmlValue)} style={{ height: '120px' }} />
            </div>
            <div className="d-flex flex-column  mb-3 gap-2">
                <label className="text-start" htmlFor="nombre-rango-txt">Valor</label>
                <InputNumber value={valor} 
                    onValueChange={(e) => setValor(e.value)} 
                    min={1} 
                    max={501} 
                />
            </div>
            <div className="mb-3 d-flex flex-row justify-content-between gap-2">
                <div className="card flex justify-content-center">
                <div className="flex flex-wrap gap-3">
                    <label className="text-start" htmlFor="nombre-rango-txt">Tipo de Medida</label>
                    {tipoMedidaList.map((item, index) => (
                        <div className="flex align-items-center" key={index}>
                            <RadioButton
                                inputId={`tipoMedida${index}`}
                                name="tipoMedida"
                                value={item.nombre}
                                checked={tipoMedida === item.nombre}
                                onChange={(e) => setTipoMedida(e.value)}
                            />
                            <label htmlFor={`tipoMedida${index}`} className="ml-2">
                                {item.nombre}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            </div>
            
            
            <div className="mb-3">
                <Button  label='Registrar' severity='info' onClick={() => handleClick()}/>
            </div>
        </>
    )
}

export default Form;