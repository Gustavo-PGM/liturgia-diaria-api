import axios from "axios";
import * as cheerio from "cheerio";
import { converterParaVersiculo } from "../utils/formatador.js";


export async function extrairLiturgia() {
  
  const { data } = await axios.get(process.env.URL_LITURGIA);
  const $ = cheerio.load(data);


  const informacoesDoDia = {

    cor: $(".cor-liturgica").text().replace("Cor Litúrgica:", "").trim() || "Não encontrada",
    data: `${$(".dia").first().text().trim()} ${$(".mes").first().text().trim()} ${$(".ano").first().text().trim()}`,
    tempoLiturgico: $("h1.entry-title").text().trim() || "Não encontrado"
  };


  const extrairLeitura = (idBotao, idConteudo, tipo) => {

    const div = $(idConteudo);
    if (!div.length || div.text().trim() === "") return "Não encontrada";

    const referencia = $(`${idBotao} .referencia`).text().trim();
    const audio = div.find(".embeds-audio iframe").attr("src") || null;
    div.find(".embeds-audio").remove();

    let responsorio = null;
    let introducao = null;
    let linhas = [];


    div.find("p").each((_, el) => {

      let txt = $(el).text().replace(/\s+/g, ' ').trim();
      let lower = txt.toLowerCase();


      if (!txt || txt === "R." || txt === "R") return;
      if (lower.includes("responsório sl") || lower.includes("salmo responsorial") || lower.includes("aleluia")) return;
      if (lower.includes("salve, ó cristo") || lower.includes("louvor e glória") || lower.includes("senhor esteja convosco")) return;
      if (lower.includes("ele está no meio de nós") || lower.includes("glória a vós, senhor")) return;
      if (lower.includes("eis o tempo") && !lower.includes("naquele tempo")) return;
      
      if (tipo === "salmo") {
        if (!responsorio && (txt.startsWith("-") || txt.startsWith("—"))) {
          responsorio = txt.replace(/[-—]/g, "").trim();
          return; 
        }
        if (txt.replace(/[-—]/g, "").trim() === responsorio) return;

        linhas.push(txt.endsWith("R.") ? txt : `${txt} R.`);
      } 


      else if (tipo === "evangelho") {
        if (lower.includes("proclamação do evangelho")) {
          introducao = txt.replace(/[-—]/g, "").trim() + " - Glória a vós, Senhor.";
          return;
        }

        if (lower.includes("evangelho (")) return; 
        
        linhas.push(txt.includes("Palavra da Salvação") ? `- ${txt}` : txt);
      } 

      else {
        if (lower.includes("primeira leitura (") || lower.includes("segunda leitura (")) return;
        if (lower.startsWith("leitura do") || lower.startsWith("leitura da")) return;
        
        linhas.push(txt);
      }
    });


    const resultado = { referencia };
    if (introducao) resultado.introducao = introducao;
    if (responsorio) resultado.responsorio = responsorio;
    
    resultado.texto = converterParaVersiculo(linhas.join(" ").trim());
    resultado.audio = audio;

    return resultado;
  };


  return {
    informacoesDoDia,
    primeiraLeitura: extrairLeitura("#lit-1", "#liturgia-1", "padrao"),
    salmo: extrairLeitura("#lit-2", "#liturgia-2", "salmo"),
    segundaLeitura: extrairLeitura("#lit-3", "#liturgia-3", "padrao"),
    evangelho: extrairLeitura("#lit-4", "#liturgia-4", "evangelho")
  };
}