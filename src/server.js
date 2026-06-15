// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");

// const connectDB = require("./config/db");

// const roomRoutes = require("./routes/roomRoutes");

// const app = express();

// connectDB();

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("RoomIt Backend Running");
// });

// app.use("/api/rooms", roomRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server Running On Port ${PORT}`);
// });



// require("dotenv").config();
// const roomRoutes = require("./routes/roomRoutes");
// app.use("/api/rooms", roomRoutes);

// const express = require("express");
// const cors = require("cors");

// const connectDB = require("./config/db");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("RoomIt Backend Running 🚀");
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, async () => {
//   console.log(`Server Running On Port ${PORT}`);

//   if (process.env.MONGODB_URI) {
//     await connectDB();
//   } else {
//     console.log("⚠️ MongoDB URI not configured yet");
//   }
// });


require("dotenv").config();
const seedRoute = require("./routes/seedRoute");
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const bookingRoutes =
require("./routes/bookingRoutes");

const roomRoutes = require("./routes/roomRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("RoomIt Backend Running");
});

app.use("/api/seed", seedRoute);
app.use("/api/rooms", roomRoutes);

app.use(
  "/api/bookings",
  bookingRoutes
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});