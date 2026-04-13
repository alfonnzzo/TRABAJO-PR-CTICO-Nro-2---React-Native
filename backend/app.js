import express from "express";
import cors from "cors";
import sequelize from "./src/config/database.js";
import { getCities, getCityById, createCity, updateCity, deleteCity } from "./src/controllers/cityController.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/cities", getCities);
app.get("/api/cities/:id", getCityById);
app.post("/api/cities", createCity);
app.put("/api/cities/:id", updateCity);
app.delete("/api/cities/:id", deleteCity);

const PORT = 3001;

const startServer = async () => {
  try {
    await sequelize.sync(); 
    console.log("Base de datos sincronizada");
    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
};

startServer();