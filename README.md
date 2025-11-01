# Descrição
O AppBiblioteca é um aplicativo de gerenciamento de biblioteca, que permite o controle de livros, usuários, emprestimos e avaliações. Além disso, possui uma função de Match, inspirado no tinder, para conhecer novas pessoas que tambem gostam de ler.

# Sumario
- [Objetivos/Motivações](#objetivos-motivações)
- [Funções feitas](#funções-feitas)

- [Tecnologias Utilizadas](tecnologias-utilizadas)
- [Como rodar o MVP localmente](#como-rodar-localmente)
  - [pré-requisitos](#pré-requisitos)
  - [variaveis de ambiente](#variaveis-de-ambiente)
  - [Clonar repositório](#clonar-repositorio)
  - [Instalar dependências](#instalar-dependencias)
  - [Rodar o banco de dados](#rodar-o-banco-de-dados)
  - [Rodar o aplicativo mobile](#rodar-o-aplicativo-mobile)

# Objetivos / Motivações
O app foi desenvolvido como projeto na disciplina `CCG410 - Engenharia de Software`, e o objetivo era criar um MVP funcional com o tema 'Biblioteca'.

# Funções feitas
- [X] Autenticação do Usuario
  - [X] Cadastrar Usuario
  - [X] Login Admin/Usuario

- [X] Controle de Estoque
  - [X] Cadastrar Livro
    - [X] Cadastrar Autor
    - [X] Cadastrar Genero de Livro
  - [X] Buscar livro
  - [X] Avaliar Livro
  - [ ] Livros em Alta / Ranking
  - [ ] E-books
  - [ ] Historico de Busca

- [X] Controle de Usuarios
  - [X] Historico de Emprestimo
    - [X] Perfil do usuario
  - [X] Listar Usuarios
    - [ ] Barrar emprestimos de usuario
  - [X] Ver historico de Usuarios

- [X] Registrar Emprestimo
  - [X] Reservar livro
    - [X] Fila de reservas
  - [X] Listar Livros atrasados
  - [ ] Renovar Emprestimo
  - [X] Registrar Devolucao

- [X] Lista de livros
  - [X] Ver livro na Lista de Livros
  - [X] Adicionar livro a Lista de Livros
  - [X] Remover livro a Lista de Livros

- [X] Tinder Livro
  - [X] Match
    - [X] Fila de espera
  - [X] Listar Matchs

- [ ] Doar Livro
- [ ] Sugerir melhorias

# Tecnologias Utilizadas
- **Backend:** Node.js, Express, PostgreSQL
- **Frontend (Mobile):** React Native (Expo)
- **Banco de Dados:** PostgreSQL + pg
- **Outros:** dotenv

# Como rodar localmente

## Pré-requisitos
- Node.js >= 24.9.0
- PostgreSQL >= 15
- npm
- Expo Go (instalado no celular)

## Variaveis de ambiente
> arquivo .env
```
DATABASE_URL=${SEU_URL}
```
## Clonar repositorio
> Obs: é preciso ter npm, nodejs instalado, e o app 'expo go'
```
git clone git@github.com:rhy2106/AppBiblioteca.git
```
## Instalar dependencias
```bash
cd AppBiblioteca # pasta do repositorio
cd backend 
npm install
cd ../mobile
npm install
```
> Obs: 
>
> Conecte com o seu proprio banco de dados postgreslq
>
> Talvez seja necessario modificar o arquivo AppBiblioteca/mobile/app/model/ip.js, altere para o seu IP ou dominio
> 
> Caso necessario, altere tambem a porta no AppBiblioteca/backend/server.js

## Rodar o banco de dados:
1. utilize o arquivo AppBiblioteca/backend/create_tables.sql, para criar a estrutura do banco de dados
2. na pasta AppBiblioteca/backend execute:
```bash
npm start
```

## Rodar o aplicativo mobile:
1. na pasta AppBiblioteca/mobile execute:
```bash
npx expo start
```
2. e então leia o QRcode que irá aparecer com o aplicativo *expo go*
