import express from "express";
import { extrairLiturgia, extrairHomilia } from "./scraping.js"; 

const app = express();

app.get("/", async (request, response) => {
  const [liturgia, homiliaData] = await Promise.all([

    // pega a liturgia e a homilia do dia simultaneamente
    extrairLiturgia(),
    extrairHomilia()
  ]);
  
  // json reestruturado para os dados ficarem melhores organizados
  response.json({
    data: homiliaData.informacoesDia?.data || "Data não encontrada",
    tempoLiturgico: homiliaData.informacoesDia?.tempoLiturgico || "Tempo litúrgico não encontrado",
    imagemTempo: homiliaData.informacoesDia?.imagem || null,
    ...liturgia, // '...liturgia' já manda Leitura, Salmo e Evangelho aqui dentro direto
    homilia: homiliaData.texto
  });
});

export default app;

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
