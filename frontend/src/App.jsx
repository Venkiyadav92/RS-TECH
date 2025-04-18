import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EmployeePage from './pages/EmployeePage';
import MainLayout from './layouts/MainLayout';
import AddEmployeePage from './pages/AddEmployeePage'; 
import EditEmployeePage from './pages/EditEmployeePage';
import ViewEmployeePage from './pages/viewEmployeePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="employees" element={<EmployeePage />} />
        <Route path="employees/add" element={<AddEmployeePage />} />
        <Route path="employees/edit/:id" element={<EditEmployeePage />} />
        <Route path="employees/view/:id" element={<ViewEmployeePage />} />


      </Route>
    </Routes>
  );
}
