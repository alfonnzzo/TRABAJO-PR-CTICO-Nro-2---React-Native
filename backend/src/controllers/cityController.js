import { CityModel } from "../models/cityModel.js";

export const getCities = async (req, res) => {
  try {
    const cities = await CityModel.findAll();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener datos", error });
  }
};

export const getCityById = async (req, res) => {
  try {
    const city = await CityModel.findByPk(req.params.id);
    if (!city) return res.status(404).json({ message: "Ciudad no encontrada" });
    res.json(city);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

export const createCity = async (req, res) => {
  const { name, country } = req.body;
  if (!name) return res.status(400).json({ message: "El nombre es obligatorio" });

  try {
    const newCity = await CityModel.create(req.body);
    res.status(201).json(newCity);
  } catch (error) {
    res.status(400).json({ message: "Error al crear la ciudad", error });
  }
};

export const updateCity = async (req, res) => {
  try {
    const city = await CityModel.findByPk(req.params.id);
    if (!city) return res.status(404).json({ message: "Ciudad no encontrada" });

    await city.update(req.body);
    res.json({ message: "Ciudad actualizada", city });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar", error });
  }
};

export const deleteCity = async (req, res) => {
  try {
    const city = await CityModel.findByPk(req.params.id);
    if (!city) return res.status(404).json({ message: "Ciudad no encontrada" });

    await city.destroy();
    res.json({ message: "Ciudad eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar", error });
  }
};