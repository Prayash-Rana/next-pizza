import mongoose from "mongoose";

const mongoURI = process.env.DB_URL;

const connection = {}; // Store connection status

async function connect() {
  // Check if already connected
  if (connection.isConnected) {
    console.log("Already connected to the database.");
    return;
  }

  // If there's a connection but not established, use its state
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("Using existing connection.");
      return;
    }
    // Disconnect existing connections if any
    await mongoose.disconnect();
  }

  // Establish a new connection
  const db = await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  connection.isConnected = db.connections[0].readyState;

  console.log("Connected to the database.");
}



async function disconnect() {
  // Check if there's an active connection
  if (connection.isConnected) {
    await mongoose.disconnect();
    connection.isConnected = false;
    console.log("Disconnected from the database.");
  } else {
    console.log("No active database connection to disconnect.");
  }
}

const db = {connect, disconnect};

export default db ;
