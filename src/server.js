import express from "express";
import { extrairLiturgia } from "./services/liturgia.js";

const app = express();

app.get("/", async (request, response) => {
  try {
    const liturgia = await extrairLiturgia();
    return response.json(liturgia);
  } catch (erro) {
    return response.status(500).json({ erro: "Erro:", erro });
  }
});

export default app;