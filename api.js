import express from "express";
import { extrairLiturgia, extrairHomilia } from "./scraping.js"; 

const app = express();

app.get("/", async (request, response) => {

  // pega a liturgia e a homilia do dia simultaneamente
  const [liturgia, homilia] = await Promise.all([
    extrairLiturgia(),
    extrairHomilia()
  ]);
  
  // '...liturgia' já manda Leitura, Salmo e Evangelho aqui dentro direto
  response.json({ ...liturgia, homilia });
});

export default app;