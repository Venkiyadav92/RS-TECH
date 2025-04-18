import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDeleteEmployee } from "../hooks/useEmployees";

export default function EmployeeRow({ data }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { mutate: deleteEmployee } = useDeleteEmployee();

  const handleDelete = () => {
    deleteEmployee(data.id);
    setShowConfirm(false);
  };

  return (
    <>
      <tr className="hover:bg-gray-100">
        <td className="px-4 py-2 flex items-center gap-2">
        <img
            src={data.avatar ? `${import.meta.env.VITE_API_BASE_URL}${data.avatar}` : 'https://via.placeholder.com/128'}
            alt="Employee"
            className="size-16 object-cover rounded-full border"
        />
          {data.name}
        </td>
        <td className="px-4 py-2">{data.id}</td>
        <td className="px-4 py-2">{data.department}</td>
        <td className="px-4 py-2">{data.designation}</td>
        <td className="px-4 py-2">{data.project}</td>
        <td className="px-4 py-2">{data.type}</td>
        <td className="px-4 py-2">{data.status}</td>
        <td className="px-4 py-2">
          <div className="flex gap-3 items-center">
            <Link to={`/employees/view/${data.id}`}>
              <Eye className="w-4 h-4 cursor-pointer" />
            </Link>
            <Link to={`/employees/edit/${data.id}`}>
              <Pencil className="w-4 h-4 cursor-pointer" />
            </Link>
            <button onClick={() => setShowConfirm(true)}>
              <Trash2 className="w-4 h-4 text-red-600 cursor-pointer" />
            </button>
          </div>
        </td>
      </tr>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg text-center w-[300px]">
            <div className="flex justify-center mb-4">
              <Trash2 className="text-blue-600 w-10 h-10" />
            </div>
            <p className="text-lg font-semibold mb-6">Are you sure you want to Delete</p>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded w-1/2 mr-2"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded w-1/2"
                onClick={handleDelete}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
