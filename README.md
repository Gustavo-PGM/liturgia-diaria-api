# 📖 API – Liturgia Diária

Uma API simples que fornece a **Liturgia Diária Católica** para aplicativos, sites, sistemas paroquiais ou projetos pessoais.

---
## 🛠 Tecnologias Utilizadas

- Node.js
- Axios
- Express
- JSON

---
## 🚀 Como Usar

A API é pública e pode ser consumida diretamente:

**Base URL:** `https://liturgia-diaria-api-alpha.vercel.app/`

### Endpoints
- `GET /` - Retorna a liturgia e homilia do dia atual.

### Exemplo de requisição (JavaScript)
```javascript
fetch('[https://liturgia-diaria-api-alpha.vercel.app/](https://liturgia-diaria-api-alpha.vercel.app/)')
  .then(res => res.json())
  .then(data => console.log(data.evangelho.texto));
```

# 📦 Exemplo de Resposta JSON

---
```json
{
  "informacoesDoDia": {
    "data": "Sexta-feira, 27 de Fevereiro de 2026",
    "tempoLiturgico": "1a. Semana da Quaresma - Ciclo da Pascoa",
    "cor": "Roxo",
    "imagemTempo": "https://sagradaliturgia.com.br/images/roxo.png"
  },
  "segundaLeitura": "Não encontrada",
  "salmo": {
    "referencia": "129(130)",
    "refrao": "Se levardes em conta nossas faltas...",
    "texto": "Das profundezas eu clamo a vós..."
  },
  "evangelho": {
    "referencia": "Mateus 5,20-26",
    "introducao": "Proclamação do Evangelho de Jesus Cristo segundo Mateus",
    "texto": "Naquele tempo, disse Jesus..."
  },
  "homilia": "A verdadeira justiça não se limita..."
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