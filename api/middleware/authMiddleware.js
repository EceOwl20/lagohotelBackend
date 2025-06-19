const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Yetki yok. Token eksik.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // req.user içinden userId ve role erişilebilir
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Geçersiz token' });
  }
}

module.exports = verifyToken;