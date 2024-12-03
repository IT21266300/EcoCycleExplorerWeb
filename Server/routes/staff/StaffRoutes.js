import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Staff from '../staff/StaffRoutes.js';

const router = express.Router();

// Sign-up
router.post('/signup', async (req, res) => {
  try {
    const { name, employeeType, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStaff = new Staff({ name, employeeType, email, password: hashedPassword });
    await newStaff.save();
    res.status(201).json({ message: 'Staff created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sign-in
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const staff = await Staff.findOne({ email });
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: staff._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit staff
router.put('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    const updatedStaff = await Staff.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(updatedStaff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete staff
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Staff.findByIdAndDelete(id);
    res.status(200).json({ message: 'Staff deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;