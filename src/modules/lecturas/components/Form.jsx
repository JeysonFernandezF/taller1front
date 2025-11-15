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
        if(fechaHora == '' || fechaHora == null){
            errores.push('El campo fecha no es valido.')
        }
        if(medidor == '' || medidor == null){
            errores.push('El campo medidor no es valido.')
        }
        if(direccion == '' || direccion == null){
            errores.push('El campo dirección no es valido.')
        }
        if(valor < 0 || valor > 500){
            errores.push('El campo valor no es valido.')
        }
         if(tipoMedida == '' || tipoMedida == null){
            errores.push('El campo tipo de medida no es valido.')
        }

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


        return {
            fechaHora: fechaHora.toLocaleString("es-CL", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }),
            medidor,
            direccion,
            valor,
            tipoMedida,}
    }

    return (
        <>
            <Toast ref={toast} />
            <div className="d-flex flex-column align-items-start mb-3 gap-2">
                <label htmlFor="form-dia">Fecha y Hora</label>
                <Calendar id="calendar-12h" value={fechaHora} onChange={(e) => setFechaHora(e.value)} showTime hourFormat="24" dateFormat="dd-m-yy" />  
            </div>
            <div className="d-flex flex-column align-items-start mb-3 gap-2">
                <label htmlFor="form-dia">Medidor</label>
                <Dropdown className='w-100' id="form-dia" value={medidor} onChange={e=>setMedidor(e.value)} options={medidorList} optionLabel="dia"
                    placeholder="Seleccionar un medidor" checkmark={true} highlightOnSelect={false}/>
            </div>
            <div className="d-flex flex-column align-items-start mb-3 gap-2">
                <label htmlFor="form-dia">Dirección</label>
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
                    <div className="flex align-items-center">
                        <RadioButton inputId="tipoMedida1" name="pizza" value="Kilowatts" onChange={(e) => setTipoMedida(e.value)} checked={tipoMedida === 'Kilowatts'} />
                        <label htmlFor="tipoMedida1" className="ml-2">Kilowatts</label>
                    </div>
                    <div className="flex align-items-center">
                        <RadioButton inputId="tipoMedida2" name="pizza" value="Mushroom" onChange={(e) => setTipoMedida(e.value)} checked={tipoMedida === 'Mushroom'} />
                        <label htmlFor="tipoMedida2" className="ml-2">Mushroom</label>
                    </div>
                    <div className="flex align-items-center">
                        <RadioButton inputId="tipoMedida3" name="pizza" value="Temperatura" onChange={(e) => setTipoMedida(e.value)} checked={tipoMedida === 'Temperatura'} />
                        <label htmlFor="tipoMedida3" className="ml-2">Temperatura</label>
                    </div>
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