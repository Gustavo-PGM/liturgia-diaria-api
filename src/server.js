import express from "express";
import { extrairLiturgia } from "./services/liturgia.js";

const app = express();

app.get("/", async (request, response) => {
  try {
    const liturgia = await extrairLiturgia();
    return response.json(liturgia);
  } catch (erro) {
    console.error("Erro no teste:", erro);
    return response.status(500).json({ erro: "Deu pau no scraping." });
  }
});