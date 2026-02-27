import axios from 'axios';
import * as cheerio from 'cheerio';
import { converterParaVersiculo } from './utils/formatador.js';

export const extrairLiturgia = async () => {


  try {
    const { data: html } = await axios.get(process.env.URL_LITURGIA);
    const $ = cheerio.load(html);

    // troquei as tags de quebra de linha por \n pro texto não vir todo grudad
    $('br').replaceWith('\n');
    $('p').append('\n');


    const texto = $('body').text().replace(/\t/g, ''); 



    // aqui pra "recortar" o texto e separar o que é cada leitura
    const primeiraLeitura = texto.match(/Primeira Leitura:(.*?)(?=Salmo Responsorial:|Segunda Leitura:)/s);
    const salmo = texto.match(/Salmo Responsorial:(.*?)(?=Segunda Leitura:|Evangelho:)/s);
    const segundaLeitura = texto.match(/Segunda Leitura:(.*?)(?=Evangelho:)/s);
    const evangelho = texto.match(/Evangelho:(.*?)(?=Reflexão:)/s);

    

    // limpa e organiza os dados da liturgia
    const estruturarSecao = (bloco) => {
  
      if (!bloco || !bloco[1]) return "Não encontrada";
      
      const linhas = bloco[1].trim().split('\n').map(l => l.trim()).filter(l => l !== '');
      if (linhas.length === 0) return "Não encontrada";

      let textoLimpo = linhas.slice(1).join('\n');
      let introducao = null;


      if (textoLimpo.includes("Proclamação")) {
        const partes = textoLimpo.split("Proclamação");
        const restoDoTexto = partes.slice(1).join("Proclamação");
        
        const divisao = restoDoTexto.split(/[–-]/);
        

        if (divisao.length > 1) {
    
          introducao = "Proclamação " + divisao[0].trim();
          textoLimpo = divisao.slice(1).join("–").trim();
        }

      }
      // procura por qualquer sequência de números no texto e transforma em versículo(números elevados)
      textoLimpo = textoLimpo.replace(/\d+/g, (match) => converterParaVersiculo(match));


      return {
        referencia: linhas[0],
        ...(introducao && { introducao }),
        texto: textoLimpo
      };
    };



    const estruturarSalmo = (bloco) => {
      if (!bloco) return "Não encontrado";
      const linhas = bloco[1].trim().split('\n').map(l => l.trim()).filter(l => l !== '');
      if (linhas.length < 2) return "Não encontrado";

      return {
        referencia: linhas[0],
        refrao: linhas[1],
        texto: linhas.slice(2).join('\n\n')
      };
    };


    return {
      primeiraLeitura: estruturarSecao(primeiraLeitura),
      segundaLeitura: estruturarSecao(segundaLeitura),
      salmo: estruturarSalmo(salmo),
      evangelho: estruturarSecao(evangelho)
    };

  } catch (erro) {
    return { erro: "Falha na liturgia.", mensagem: erro.message };
  }
};



export const extrairHomilia = async () => {

  try {

    const { data: html } = await axios.get(process.env.URL_HOMILIA);
    const $ = cheerio.load(html);
    
    $('br').replaceWith('\n');
    $('p').append('\n');

  
    const cabecalhoBloco = $('.ui-body.ui-body-a.ui-corner-all').first();
    const imagemCaminho = cabecalhoBloco.find('img').attr('src');



    let corFormatada = "Cor não encontrada";

    if (imagemCaminho) {

      const match = imagemCaminho.match(/\/([^\/]+)\.(?:png|jpg|jpeg|gif|webp)$/i);
      
      if (match && match[1]) {
        const corCrua = match[1].toLowerCase(); // converte para minúsculo para comparar
        
        const coresLiturgicas = ["branco", "verde", "roxo", "vermelho", "rosa", "preto"];

    
        if (coresLiturgicas.includes(corCrua)) {
          corFormatada = corCrua.charAt(0).toUpperCase() + corCrua.slice(1);
        }
      }
    }

    
    const infosCabecalho = cabecalhoBloco.text().split('\n').map(l => l.trim()).filter(l => l !== '');


    const baseUrl = new URL(process.env.URL_HOMILIA).origin;
    const urlImagemCompleta = (imagemCaminho && imagemCaminho.startsWith('/')) 
      ? `${baseUrl}${imagemCaminho}` 
      : imagemCaminho;

    const textoCompleto = cabecalhoBloco.text();
    const textoHomilia = textoCompleto.split(')').slice(1).join(')').split('#')[0].trim();

    return {

      informacoesDia: {
        data: infosCabecalho[0] || "",
        
        tempoLiturgico: [infosCabecalho[1], infosCabecalho[2]].filter(Boolean).join(' - '), 
        imagem: urlImagemCompleta,

        corLiturgica: corFormatada
      },
      texto: textoHomilia
    };

  } catch (erro) {
    return "Homilia não encontrada";
  }
};