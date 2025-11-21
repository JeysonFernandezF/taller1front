
import React from 'react'; 
import { Menubar } from 'primereact/menubar';
import { useNavigate } from "react-router";

export default function Navbar() {
    let navigate = useNavigate();
    const items = [
        {
            label: 'Inicio',
            icon: 'pi pi-link',
            command: () => {
                navigate("/");
            }
        },
        {
            label: 'Registrar Lecturas',
            icon: 'pi pi-link',
            command: () => {
                navigate("/lecturas");
            }
        },
        {
            label: 'Mediciones Existentes',
            icon: 'pi pi-link',
            command: () => {
                navigate("/mediciones");
            }
        },
    ];

    return (
        <div className='mb-2'>
            <Menubar model={items} />
        </div>
    )
}
        