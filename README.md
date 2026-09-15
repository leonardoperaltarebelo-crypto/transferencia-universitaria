# Transferência Universitária

Organizador do processo de transferência universitária: faculdades avaliadas,
checklist de documentos por faculdade e prazos, tudo em um só lugar.

## Tecnologias

- [Vite](https://vite.dev/) — build tool
- [React](https://react.dev/) — biblioteca de interface
- [Tailwind CSS](https://tailwindcss.com/) — estilização

## Estrutura do projeto

```
src/
  data/
    colleges.js        # Dados das faculdades e o template de checklist
  hooks/
    useLocalStorage.js # Hook de estado persistido no navegador
  utils/
    format.js          # Formatação de moeda/datas e ordenação por prazo
  components/
    Colleges.jsx        # Aba "Faculdades": tabela comparativa + cards de detalhe
    Checklist.jsx        # Aba "Checklist": checklist de documentos por faculdade
    Deadlines.jsx        # Aba "Prazos": linha do tempo gerada a partir dos dados
  App.jsx
  main.jsx
  index.css
```

## Faculdades cadastradas

Lynn University, Palm Beach Atlantic University, Rollins College, NYU Stern,
Fordham University (Gabelli), Baruch College (Zicklin) e Pace University.

Cada faculdade tem: prazo de inscrição, custo de lista, informações de bolsa,
uma estimativa de custo real após bolsa (quando os dados permitem calcular),
prós e contras.

A aba **Prazos** é gerada automaticamente a partir dos dados em
`src/data/colleges.js` — para atualizar prazos ou adicionar uma faculdade,
basta editar esse arquivo.

A aba **Checklist** salva o progresso no `localStorage` do navegador
(por faculdade), então o estado marcado persiste entre sessões no mesmo
navegador/dispositivo.

## Como rodar o projeto localmente

1. Instale o [Node.js](https://nodejs.org/) (versão 18 ou superior).
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

   Abra o endereço mostrado no terminal (geralmente `http://localhost:5173`).

## Build de produção

```bash
npm run build
```

Gera a pasta `dist/` pronta para publicar em Vercel, Netlify, GitHub Pages, etc.
Para testar a versão de produção localmente: `npm run preview`.

## Atualizando os dados

Edite `src/data/colleges.js`:

- `colleges`: lista de faculdades. `deadlineDate` no formato `YYYY-MM-DD`
  (ou `null` para rolling) controla a ordenação em "Faculdades" e "Prazos".
- `checklistTemplate`: lista de itens do checklist aplicada a todas as
  faculdades.
