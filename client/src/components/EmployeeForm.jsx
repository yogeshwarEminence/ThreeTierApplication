import { useEffect, useState } from 'react';

const emptyForm = { name: '', email: '', department: '', salary: '' };

function EmployeeForm({ onSubmit, editingEmployee, onCancel }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingEmployee) {
      setForm(editingEmployee);
    } else {
      setForm(emptyForm);
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, salary: Number(form.salary) });
    setForm(emptyForm);
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h2>{editingEmployee ? 'Edit Employee' : 'Add Employee'}</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="salary"
        placeholder="Salary"
        value={form.salary}
        onChange={handleChange}
        required
      />
      <div className="form-buttons">
        <button type="submit">{editingEmployee ? 'Update' : 'Add'}</button>
        {editingEmployee && (
          <button type="button" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
}

export default EmployeeForm;
