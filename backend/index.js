const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const employeeRoutes = require('./routes/employees');

app.use(cors());
app.use(express.json());

app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/employees', employeeRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
