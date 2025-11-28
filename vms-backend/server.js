const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());

// Import Routes
const userRoutes = require('./routes/userRoutes');
const companyRoutes = require('./routes/companyRoutes');
const visitorRoutes = require('./routes/visitorRoutes');
const passRoutes = require('./routes/passRoutes');
const hostRoutes = require("./routes/hostRoutes");
const adminRoutes = require("./routes/adminRoutes");


app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/passes', passRoutes);
app.use('/uploads', express.static('uploads'));
app.use("/api/host", hostRoutes);
app.use("/api/admin", adminRoutes);



// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Start Server
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
