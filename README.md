# 📖 API – Liturgia Diária

Uma API simples que fornece a **Liturgia Diária Católica** para aplicativos, sites, sistemas paroquiais ou projetos pessoais, salvando os dados no **Supabase** para funcionar como cache, evitando scraping e melhorando a performance.

---
## 🛠 Tecnologias Utilizadas

- Node.js
- Axios
- Express
- JSON

---
## 💾 Banco de Dados

A API também **salva automaticamente os dados da liturgia no Supabase**, garantindo persistência e histórico das informações.

📸 *Exemplo dos dados salvos no banco:*

![Dados salvos no Supabase](https://github.com/user-attachments/assets/872d93a0-1196-4874-9788-5c28f43af4af)

---
## 🚀 Como Usar

A API é pública e pode ser consumida diretamente:

**Base URL:** `https://liturgia-diaria-api-alpha.vercel.app/`

### Endpoints
- `GET /` - Retorna a liturgia e homilia do dia atual.

### Exemplo de requisição (JavaScript)
```javascript
fetch('https://liturgia-diaria-api-alpha.vercel.app/')
  .then(res => res.json())
  .then(data => console.log(data.evangelho.texto));
```

# 📦 Exemplo de Resposta JSON

---
```json
{
  {
  "informacoesDoDia": {
    "data": "Domingo, 22 de Fevereiro de 2026",
    "tempoLiturgico": "1o. Domingo da Quaresma - Ciclo da Pascoa",
    "cor": "Roxo",
    "imagemTempo": "https://sagradaliturgia.com.br/images/roxo.png"
  },
  "primeiraLeitura": { 
    "referencia": "Gênesis 2,7-9; 3,1-7", 
    "texto": "Leitura do Livro do Gênesis...  " 
  },
  "segundaLeitura": { 
    "referencia": "Romanos 5, 12-19", 
    "texto": "Leitura da carta de São Paulo aos Romanos..." }, // Ou não encontrada
  "salmo": {
    "referencia": "50 (51)",
    "refrao": "Se levardes em conta nossas faltas...",
    "texto": "Piedade, ó Senhor, tende piedade, pois pecamos contra vós"
  },
  "evangelho": {
    "referencia": "Mateus 4,1-11",
    "introducao": "Proclamação...",
    "texto": ".Naquele tempo..."
  },
  "homilia": {
    "pregador": "Pe. João Manoel Lopes",
    "texto": "O deserto das tentações revela cristo..."
  }
}
```

## 🤝 Contribuição

1. Faça um **fork** do projeto  
2. Crie uma **branch** para sua feature  
3. Commit suas alterações  
4. Abra um **Pull Request**
5. Entre em contato para ajudar a manter o projeto no ar.
---

## 🙏 Final

Este projeto foi desenvolvido com o propósito de evangelizar através da tecnologia.

> "Ide pelo mundo inteiro e anunciai o Evangelho." – Marcos 16,15

Deus abençoe 🙏