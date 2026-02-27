import express from "express";
import { extrairLiturgia, extrairHomilia } from "./scraping.js"; 
import { obterCacheSupabase, salvarCacheSupabase } from "./utils/cache.js";

const app = express();


app.get("/", async (request, response) => {

  try {
    const hoje = new Date().toLocaleDateString('pt-BR');

    // busca o cache - se não tem ele faz o scraping
    const cache = await obterCacheSupabase(hoje);
    if (cache) {
      return response.json(cache);
    }


    const [liturgia, homiliaData] = await Promise.all([
      extrairLiturgia(),
      extrairHomilia()
    ]);


    const respostaFormatada = {

      informacoesDia: {

        data: homiliaData.informacoesDia?.data || "Data não encontrada",
        tempoLiturgico: homiliaData.informacoesDia?.tempoLiturgico || "Tempo litúrgico não encontrado",
        cor: homiliaData.informacoesDia?.corLiturgica || "Cor não encontrada",
        imagemTempo: homiliaData.informacoesDia?.imagem || null
      },

      ...liturgia,  // '...liturgia' já manda Leitura, Salmo e Evangelho aqui dentro direto
      homilia: homiliaData.texto
    };

    // guarda no banco para não precisar fazer scraping de novo
    await salvarCacheSupabase(hoje, respostaFormatada);

    return response.json(respostaFormatada);

  } catch (erro) {
    return response.status(500).json({ erro: "Falha interna no servidor." });
  }
});

export default app;