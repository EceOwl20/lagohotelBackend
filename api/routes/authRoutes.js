const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Kullanıcı girişi
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Kullanıcı bulunamadı' });

    if (user.password !== password) {
      return res.status(401).json({ error: 'Şifre yanlış' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2d' }
    );

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: 'Giriş hatası' });
  }
});

// Kullanıcı kaydı
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Bu email ile zaten bir kullanıcı var' });
    }

    const newUser = new User({
      name,
      email,
      password, // düz metin olarak kaydediyoruz
      role: role || 'personel',
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '2d' }
    );

    res.status(201).json({ token, user: newUser });
  } catch (err) {
    res.status(500).json({ error: 'Kayıt hatası' });
  }
});

module.exports = router;