import axios from 'axios';
import * as cheerio from 'cheerio';

export const extrairLiturgia = async () => {

  try {

    const url = (await axios.get(process.env.URL_LITURGIA)).data;
    const texto = cheerio.load(url)('body').text(); 


    // leituras
    const leitura = texto.match(/Primeira Leitura:(.*?)(?=Segunda Leitura:|Salmo Responsorial:)/s);
    const segundaLeitura = texto.match(/Segunda Leitura:(.*?)(?=Salmo Responsorial:)/s);
    const salmo = texto.match(/Salmo Responsorial:(.*?)(?=Evangelho:)/s);

   // ele para na reflexão, pois a reflexão dessa liturgia é genérica
    const evangelho = texto.match(/Evangelho:(.*?)(?=Reflexão:)/s);


    // retorna os textos de forma organizda
    return {
      primeiraLeitura: leitura ? leitura[1].trim() : "Não encontrada",
      segundaLeitura: segundaLeitura ? segundaLeitura[1].trim() : null,
      salmo: salmo ? salmo[1].trim() : "Não encontrado",
      evangelho: evangelho ? evangelho[1].trim() : "Não encontrado"
    };


  } catch (erro) {
    return { erro: "Falha em buscar as liturgia do dia. Reporte no GitHub: https://github.com/Gustavo-PGM/liturgia-diaria-api" , mensagem: erro};
  }
};

// essa homilia é mais real, feita por um padre
export const extrairHomilia = async () => {
  try {
    const url = (await axios.get(process.env.URL_HOMILIA)).data;
    // extração do texto puro da homilia
    return cheerio.load(url)('.ui-body.ui-body-a.ui-corner-all').text().split(')').slice(1).join(')').split('#')[0].trim();
  } catch (erro) {
    return "Homilia não encontrada";
  }
};