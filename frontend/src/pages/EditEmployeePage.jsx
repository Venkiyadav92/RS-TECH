import { useForm } from 'react-hook-form';
import { useEmployee, useUpdateEmployee } from '../hooks/useEmployees';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function EditEmployeePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: employee, isLoading: isFetching, isError } = useEmployee(id);
  const { mutate: updateEmployee, isLoading: isSaving } = useUpdateEmployee();
  const { register, handleSubmit, reset } = useForm();
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (employee) {
      reset({
        name: employee.name || '',
        id: employee.id || '',
        department: employee.department || '',
        designation: employee.designation || '',
        project: employee.project || '',
        type: employee.type || '',
        status: employee.status || '',
      });

      if (employee.avatar || employee.image) {
        const imageUrl = import.meta.env.VITE_API_BASE_URL + (employee.avatar || employee.image);
        setPreview(imageUrl);
      }
    }
  }, [employee, reset]);

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('id', data.id);
    formData.append('department', data.department);
    formData.append('designation', data.designation);
    formData.append('project', data.project || '');
    formData.append('type', data.type);
    formData.append('status', data.status);

    if (data.photo?.[0]) {
      formData.append('avatar', data.photo[0]);
    }

    updateEmployee(
      { id, formData },
      {
        onSuccess: () => {
          navigate('/employees');
        },
        onError: (error) => {
          console.error('Failed to update employee:', error);
        },
      }
    );
  };

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

  if (isFetching) return <p className="p-4">Loading employee details...</p>;
  if (isError) return <p className="p-4 text-red-600">Error loading employee.</p>;

  return (
    <div className="p-10">
      <div className="flex items-center gap-4 mb-6">
        <ArrowLeft className="cursor-pointer" size={28} onClick={() => navigate(-1)} />
        <h1 className="text-3xl font-semibold">Edit Employee</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
        {/* Image Upload */}
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

        {/* Form Inputs */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Name*</label>
          <input {...register('name')} className="w-full border rounded px-3 py-2" required />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Employee ID*</label>
          <input {...register('id')} readOnly className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed" />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Department*</label>
          <select {...register('department')} className="w-full border rounded px-3 py-2" required>
            <option value="">Select Department</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="HR">HR</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Designation*</label>
          <select {...register('designation')} className="w-full border rounded px-3 py-2" required>
            <option value="">Select Designation</option>
            <option value="Manager">Manager</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Intern">Intern</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Project</label>
          <input {...register('project')} className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Type*</label>
          <select {...register('type')} className="w-full border rounded px-3 py-2" required>
            <option value="">Select Type</option>
            <option value="Office">Office</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Status*</label>
          <select {...register('status')} className="w-full border rounded px-3 py-2" required>
            <option value="">Select Status</option>
            <option value="Permanent">Permanent</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        {/* Action Buttons */}
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
            disabled={isSaving}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {isSaving ? 'Saving...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
}
