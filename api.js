import express from "express";
import { extrairLiturgia, Extrairhomilia } from "./scraping.js"; 
import 'dotenv/config';

const app = express();

app.get("/", async (request, response) => {

  // pega a liturgia e a homilia do dia simultaneamente
  const [liturgia, homilia] = await Promise.all([
    extrairLiturgia(),
    Extrairhomilia()
  ]);
  
  // '...liturgia' já manda Leitura, Salmo e Evangelho aqui dentro direto
  response.json({ ...liturgia, homilia });
});

export default app;