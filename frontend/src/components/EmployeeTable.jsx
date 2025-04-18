import { useState } from 'react';
import AddEmployeeButton from './AddEmployeeButton.jsx';
import EmployeeRow from './EmplyeeRow.jsx';
import SearchBar from './SearchBar.jsx';

export default function EmployeeTable({ employees }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = employees.filter((emp) =>
    Object.values(emp)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4 gap-2">
        <h1 className="text-2xl font-bold">Employee</h1>
        <div className="flex gap-2">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <AddEmployeeButton />
        </div>
      </div>

      <table className="w-full mt-6 text-left border-collapse border border-gray-400 rounded-sm">
        <thead>
          <tr>
            {[
              'Employee Name',
              'Employee ID',
              'Department',
              'Designation',
              'Project',
              'Type',
              'Status',
              'Action',
            ].map((col) => (
              <th key={col} className="px-4 py-2 border-b font-light">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((emp, index) => (
              <EmployeeRow key={index} data={emp} />
            ))
          ) : (
            <tr>
              <td colSpan={8} className="px-4 py-4 text-center text-gray-500">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
