# Projeto desenvolvido durante o Hackathon da Contcode

## Sobre o projeto

É uma aplicação inspirada no Duolingo para incentivar crianças e adolescentes a fazer exercícios de reforço sobre conteúdo abordados em suas aulas escolares.

Dentro da plataforma cada aluno escolhe sua série(ano) atual e os quizes que serão exibidos para o aluno são baseados na série escolhida separados por matérias e tópicos.

O projeto tem um modelo de gameficação onde a cada quiz que o aluno finaliza ele ganha pontos baseados nos acerto que teve das questões, estes pontos são somados para um ranking global e pode ser utilizado para um ranking entre amigos.

## Tecnologias utilizadas

- NodeJS
- Fastify
- PostgreSQL
- DrizzleORM
- NextJS
- Clerk

## Como rodar o projeto

Todo o projeto está configurado para rodar no Docker, para isso basta executar o comando abaixo:

  1. `docker compose up -d`
  2. `docker compose exec backend sh -c 'yarn db:push && yarn seed seed'`

## ⚠️ Atenção

É necessário configurar variáveis de ambiente para que a aplicação funcione corretamente, para isso basta criar um arquivo `.env` na raiz da pasta backend com o seguinte conteúdo:

### Backend

```sh
HOST=0.0.0.0
PORT=8080
DATABASE_URL=postgres://docker:docker@localhost:5432/hackathon
CORS=*
ACCESS_KEY=abc123
```

### Frontend

```sh
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=clerk_publishable_key
CLERK_SECRET_KEY=clerk_secret_key

NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_API_URL=http://backend:8080
```

Para acessar o projeto basta acessar a porta `3000` do seu servidor, caso não tenha configurado o seu servidor para acessar a porta `3000` basta acessar `localhost:3000`.

---
Grupo: DevsJS

- [Anderson Wilmsen](https://github.com/anderwll)
- [Diener Dornelas](https://github.com/dienerld)
- [Emanoel Saraiva](https://github.com/EmanoelSaraiva)
- [Samuel Ramos](https://github.com/ProgSamuel)
