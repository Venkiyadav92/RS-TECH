import EmployeeTable from '../components/EmployeeTable';
import { useEmployees } from '../hooks/useEmployees';

export default function EmployeePage() {
  const { data: employees, isLoading, isError } = useEmployees();
  if (isLoading) return <p className="p-4">Loading employees...</p>;
  if (isError) return <p className="p-4 text-red-600">Error fetching employees.</p>;

  return (
    <div className="p-4">
      <EmployeeTable employees={employees} />
    </div>
  );
}

