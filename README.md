# Ybera Tasks

Sistema interno de pedidos entre setores — Ybera.

## Tecnologias

- React 18
- Vite 5
- Deploy: Vercel

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse: http://localhost:5173

## Build para produção

```bash
npm run build
```

## Deploy no Vercel

### Opção 1 — Via GitHub (recomendado)

1. Suba este projeto para um repositório no GitHub
2. Acesse [vercel.com](https://vercel.com) e clique em **Add New Project**
3. Selecione o repositório
4. Deixe as configurações padrão (Vercel detecta Vite automaticamente)
5. Clique em **Deploy**

### Opção 2 — Via Vercel CLI

```bash
npm install -g vercel
vercel
```

## Senhas (demo)

| Setor        | Senha      |
|-------------|-----------|
| Manipulação | manip123  |
| Produção    | prod123   |
| Estoque G0  | g0123     |
| Estoque G1  | g1123     |
| Estoque G9  | g9123     |
| Manutenção  | manut123  |
| Motorista   | moto123   |

## Estrutura

```
ybera-tasks/
├── index.html
├── vite.config.js
├── vercel.json
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── data.js
    ├── assets/
    │   └── logo.png
    ├── hooks/
    │   └── usePulse.js
    ├── components/
    │   ├── AcaoBtn.jsx
    │   ├── BannerAlerta.jsx
    │   ├── CardPedido.jsx
    │   └── StatusCard.jsx
    └── pages/
        ├── TelaLogin.jsx
        ├── PainelSolicitante.jsx
        └── PainelPrestador.jsx
```
