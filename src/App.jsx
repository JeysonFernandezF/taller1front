
import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import MainLayout from './layouts/MainLayout'
import { MedicionesPage } from './modules/mediciones/pages/MedicionesPage'
import LecturasPage from './modules/lecturas/pages/LecturasPage'

export default function App() {

  return (
    <Routes>
       <Route element={<MainLayout />}>
       <Route index element={<Navigate replace to="/mediciones" />} />
        <Route path="mediciones" element={<MedicionesPage />} />
        <Route path='lecturas' element={<LecturasPage />} />
      </Route>
    </Routes>
  )
}

