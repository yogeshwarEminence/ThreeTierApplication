import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import SearchBox from './components/SearchBox';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import api from './api';

function App() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [editingEmployee, setEditingEmployee] = useState(null);

  const fetchEmployees = async (name = '') => {
    try {
      const res = await api.get('/', { params: name ? { name } : {} });
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchEmployees(search);
    }, 300);
    return () => clearTimeout(delay);
  }, [search]);

  const handleAddOrUpdate = async (employee) => {
    try {
      if (editingEmployee) {
        await api.put(`/${editingEmployee._id}`, employee);
        setEditingEmployee(null);
      } else {
        await api.post('/', employee);
      }
      fetchEmployees(search);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  const handleCancelEdit = () => {
    setEditingEmployee(null);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/${id}`);
      fetchEmployees(search);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <EmployeeForm
          onSubmit={handleAddOrUpdate}
          editingEmployee={editingEmployee}
          onCancel={handleCancelEdit}
        />
        <SearchBox value={search} onChange={setSearch} />
        <EmployeeList
          employees={employees}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
