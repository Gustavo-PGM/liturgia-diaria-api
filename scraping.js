import axios from "axios";
import * as cheerio from "cheerio"
import 'dotenv/config';


export const Extrairhomilia = async () => {
  const url = (await axios.get(process.env.URL_HOMILIA)).data;
  const $ = cheerio.load(url);

  const textoLimpo = $('.ui-body.ui-body-a.ui-corner-all').text().split(')').slice(1).join(')').split('#')[0].trim();

  return textoLimpo
};