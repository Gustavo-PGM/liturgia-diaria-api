import { Extrairhomilia} from "./scraping.js";
import express from "express";

const app = express();
const PORT = process.env.PORT || 333


app.get("/homilia", async (request, response) => {

  const homilia = await Extrairhomilia()
  
  response.json({homilia})
})


export default app;