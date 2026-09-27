# MUSICLAND

Web app educacional que gamifica o aprendizado de teoria musical. Projeto da Atividade Extensionista II do CST em Análise e Desenvolvimento de Sistemas (UNINTER).

Público-alvo: crianças, adolescentes e jovens de escolas públicas, centros comunitários e projetos sociais de Manaus-AM.

## Stack

- Next.js 16 (App Router) + TypeScript (strict)
- Tailwind CSS + shadcn/ui
- Zustand, Framer Motion, Lucide, Tone.js
- SQLite no servidor (`node:sqlite`) e sql.js + IndexedDB no cliente
- Vitest + React Testing Library
- ESLint + Prettier

## Como executar

Pré-requisito: Node.js 22 ou superior (`node:sqlite`).

```bash
npm install
cp .env.example .env.local   # opcional
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run test
npm run test:coverage
npm run format
npm run build
```

## Estrutura

```
app/                 rotas (landing, auth, dashboard, api)
components/          UI, landing, game, quiz, music, auth
lib/                 música, gamificação, auth, quiz, db
stores/              Zustand
types/               tipos TypeScript
public/              sql-wasm + audio
proxy.ts             guarda /settings (CA-09)
```
