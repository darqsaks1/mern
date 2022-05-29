const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const app = express();
app.use(express.json({ extend: true }));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/link", require("./routes/links.routes"));

const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
    });
    app.listen(PORT, () => console.log(`App has been started ${PORT}`));
  } catch (e) {
    console.log("Server Err", e);
    process.exit(1);
  }
}

start();
