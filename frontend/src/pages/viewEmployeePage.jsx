import { useEmployee } from '../hooks/useEmployees';
import { useParams, useNavigate } from 'react-router-dom';

export default function ViewEmployeePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: employee, isLoading, isError } = useEmployee(id);

  if (isLoading) return <p className="p-4">Loading employee details...</p>;
  if (isError || !employee) return <p className="p-4 text-red-600">Error loading employee.</p>;

   // Dynamically generate the base URL for the avatar
   const avatarUrl = employee.avatar
   ? `${import.meta.env.VITE_API_BASE_URL}${employee.avatar}`
   : 'https://via.placeholder.com/128';

  return (
    <div className="p-6">
      <div className="flex gap-2 items-center">
        <div className='text-4xl cursor-pointer' onClick={() => navigate(-1)}>{`<`}</div>
        <h1 className="text-4xl font-bold mb-4">Employee Details</h1>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 relative w-32 h-32">
        <img
            src={avatarUrl}
            alt="Employee"
            className="w-32 h-32 object-cover rounded border"
        />

        </div>

        <input value={employee.name} readOnly className="border rounded p-2 bg-gray-100" />
        <input value={employee.id} readOnly className="border rounded p-2 bg-gray-100" />
        <input value={employee.department} readOnly className="border rounded p-2 bg-gray-100" />
        <input value={employee.designation} readOnly className="border rounded p-2 bg-gray-100" />
        <input value={employee.project} readOnly className="border rounded p-2 bg-gray-100" />
        <input value={employee.type} readOnly className="border rounded p-2 bg-gray-100" />
        <input value={employee.status} readOnly className="border rounded p-2 bg-gray-100" />

        <div className="col-span-2 flex justify-end gap-2 mt-4">
          <button
            onClick={() => navigate('/employees')}
            className="px-4 py-2 rounded bg-gray-300"
          >
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
}
