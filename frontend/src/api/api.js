import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Change to your backend URL if different
});

console.log("API base URL", API.defaults.baseURL);

// Employees API methods
export const getEmployees = async () => {
  const res = await API.get('/employees');
  return res.data;
};

export const getEmployeeById = async (id) => {
  const res = await API.get(`/employees/${id}`);
  return res.data;
};

export const createEmployee = async (employee) => {
  const res = await API.post('/employees', employee, {
    headers: {
      'Content-Type': 'multipart/form-data', // Optional – can also let Axios infer this
    },
  });
  return res.data;
};


// ✅ Updated this function only
export const updateEmployee = async ({ id, formData }) => {
  const res = await API.put(`/employees/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};


export const deleteEmployee = async (id) => {
  const res = await API.delete(`/employees/${id}`);
  return res.data;
};
