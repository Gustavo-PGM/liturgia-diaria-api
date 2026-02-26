import { Extrairhomilia} from "./scraping.js";
import express from "express";

const app = express();
const PORT = 333

app.get("/homilia", async (request, response) => {

  const homilia = await Extrairhomilia()
  
  response.json({homilia})
})


app.listen(PORT, () => {
  console.log("Servidor Rodando...")
})

export default app;