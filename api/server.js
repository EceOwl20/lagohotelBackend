const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/uploads', express.static('public/uploads'));

const pageRoutes = require('./routes/pageRoutes');
app.use('/api/pages', pageRoutes);

const uploadRoutes = require("./routes/uploadRoutes");
app.use("/api/upload", uploadRoutes);

const headerRoutes = require('./routes/headerRoutes');
app.use("/api",headerRoutes)

const footerRoutes = require('./routes/footerRoutes');
app.use("/api",footerRoutes)

const contactSection2Routes = require('./routes/contactSection2');
app.use('/api/contactSection2', contactSection2Routes);

const otherOptionsRoutes = require('./routes/otherOptions');
app.use('/api/otherOptions', otherOptionsRoutes);

const roomFeaturesRoutes = require('./routes/roomFeatures');
app.use('/api/roomFeatures', roomFeaturesRoutes);


// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB bağlantısı başarılı'))
.catch((err) => console.error('❌ MongoDB bağlantı hatası:', err));

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Sunucu çalışıyor: http://localhost:${PORT}`);
});
