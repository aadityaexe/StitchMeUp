import { validationResult } from 'express-validator';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';

 const resetPasswordController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { token } = req.params;
  const { password } = req.body;

  try {
    // Hash token from URL
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  
    const user = await userModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: 'Token is invalid or expired' });

  
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

 
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: 'Password has been reset successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export default resetPasswordController;