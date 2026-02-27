# 📖 API – Liturgia Diária

Uma API simples que fornece a **Liturgia Diária Católica** em formato JSON, pronta para ser utilizada em aplicativos, sites, sistemas paroquiais ou projetos pessoais.

A API retorna:

- 📅 Data do dia
- 🎨 Tempo litúrgico
- 🖼 Imagem do tempo
- 📜 Primeira leitura
- 📖 Segunda leitura (quando houver)
- 🎵 Salmo
- ✝ Evangelho
- 🗣 Homilia

---

## ✨ Objetivo

Facilitar o acesso à Liturgia Diária de forma estruturada e organizada para consumo em aplicações frontend ou mobile.

Ideal para:

- Aplicativos católicos
- Sites paroquiais
- Telões de igreja
- Projetos de estudo bíblico
- Bots e automações

---

## 📦 Exemplo de Resposta

```json
{
  "data": "Sexta-feira, 27 de Fevereiro de 2026",
  "tempoLiturgico": "1ª Semana da Quaresma – Ciclo da Pascoa",
  "imagemTempo": "https://sagradaliturgia.com.br/images/roxo.png",
  "primeiraLeitura": {
    "referencia": "Ezequiel 18,21-28",
    "texto": "Leitura da profecia de Ezequiel..."
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

## 🧱 Estrutura do JSON

*   **data**: Data completa da liturgia.
*   **tempoLiturgico**: Tempo da Igreja (Advento, Natal, Quaresma, Páscoa, Tempo Comum).
*   **imagemTempo**: URL da imagem correspondente à cor litúrgica do dia.
*   **primeiraLeitura**:
    *   `referencia`
    *   `texto`
*   **segundaLeitura**: Pode retornar "Não encontrada" quando não houver leitura.
*   **salmo**:
    *   `referencia`
    *   `refrao`
    *   `texto`
*   **evangelho**:
    *   `referencia`
    *   `introducao`
    *   `texto`
*   **homilia**: Reflexão pastoral baseada no Evangelho do dia.

---

## 🚀 Como Usar
### Exemplo com JavaScript
```javascript
fetch("http://localhost:3000/liturgia")
  .then(response => response.json())
  .then(data => {
    console.log(data.evangelho.texto)
  })
```

# 🛠 Tecnologias Utilizadas

- Node.js
- Express
- JSON

# 🔮 Melhorias Futuras

- Filtro por data (`?data=YYYY-MM-DD`)
- Histórico de liturgias
- Sistema de cache
- Endpoint individual para cada seção
- Internacionalização
- Documentação Swagger/OpenAPI

# 🤝 Contribuição

1. Faça um **fork** do projeto
2. Crie uma **branch** para sua feature
3. Commit suas alterações
4. Abra um **Pull Request**

# 🙏 Final

Este projeto foi desenvolvido com o propósito de evangelizar através da tecnologia.

> "Ide pelo mundo inteiro e anunciai o Evangelho." – Marcos 16,15

Deus abençoe 🙏