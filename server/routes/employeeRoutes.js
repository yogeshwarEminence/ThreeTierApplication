const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// GET all employees (optional search by name via query)
router.get('/', async (req, res) => {
  try {
    const { name } = req.query;
    const filter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const employees = await Employee.find(filter).sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single employee
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE employee
router.post('/', async (req, res) => {
  try {
    const { name, email, department, salary } = req.body;
    const employee = new Employee({ name, email, department, salary });
    const saved = await employee.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE employee
router.put('/:id', async (req, res) => {
  try {
    const { name, email, department, salary } = req.body;
    const updated = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, email, department, salary },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Employee not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE employee
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
