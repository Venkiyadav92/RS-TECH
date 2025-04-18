import { useForm } from 'react-hook-form';
import { useCreateEmployee } from '../hooks/useEmployees';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function AddEmployeePage() {
  const { register, handleSubmit, reset } = useForm();
  const { mutate: createEmployee, isLoading } = useCreateEmployee();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    for (const key in data) {
      if (key === 'photo') {
        if (data[key]?.[0]) {
          formData.append('avatar', data[key][0]);
        }
      } else {
        formData.append(key, data[key]);
      }
    }

    createEmployee(formData, {
      onSuccess: () => {
        reset();
        navigate('/employees');
      },
      onError: (error) => {
        console.error('Failed to create employee:', error);
      },
    });
  };

  return (
    <div className="p-10">
      <div className="flex items-center gap-4 mb-6">
        <ArrowLeft className="cursor-pointer" size={28} onClick={() => navigate(-1)} />
        <h1 className="text-3xl font-semibold">Add New Employee</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
        {/* Image upload */}
        <div className="col-span-2 flex items-center gap-4">
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-gray-300">
            <input
              type="file"
              {...register('photo')}
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept="image/*"
              onChange={handleImageChange}
            />
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-sm text-gray-500">
                Upload
              </div>
            )}
          </div>
          <span className="text-gray-600">Click on the photo to upload</span>
        </div>

        {/* Inputs */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Name*</label>
          <input
            {...register('name')}
            placeholder="Name"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Employee ID*</label>
          <input
            {...register('employee_id')}
            placeholder="Employee ID"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Department*</label>
          <select
            {...register('department')}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select Department</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="HR">HR</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Designation*</label>
          <select
            {...register('designation')}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select Designation</option>
            <option value="Manager">Manager</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Intern">Intern</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Project</label>
          <input
            {...register('project')}
            placeholder="Project"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Type*</label>
          <select
            {...register('type')}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select Type</option>
            <option value="Office">Office</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Status*</label>
          <select
            {...register('status')}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select Status</option>
            <option value="Permanent">Permanent</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="col-span-2 flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate('/employees')}
            className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {isLoading ? 'Saving...' : 'Confirm'}
          </button>
        </div>
      </form>
    </div>
  );
}
