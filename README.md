# Sumario
- [Funções feitas](#funções-feitas)
- [Como rodar o MVP localmente](#como-rodar-localmente)
  - [Clonar repositório](#clonar-repositorio)
  - [Instalar dependências](#instalar-dependencias)
  - [Rodar o banco de dados](#rodar-o-banco-de-dados)
  - [Rodar o aplicativo mobile](#rodar-o-aplicativo-mobile)

## Funções feitas
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

- [ ] Tinder Livro
  - [ ] Match
    - [ ] Fila de espera
  - [ ] Listar Matchs
  - [ ] chat?

- [ ] Doar Livro
- [ ] Sugerir melhorias

# Como rodar localmente
## Clonar repositorio
> Obs: é preciso ter npm, nodejs instalado
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
> Obs: o arquivo .env da pasta backend não está incluso no repositorio
>
> Conecte com o seu proprio banco de dados postgreslq
>
> Talvez seja necessario modificar o arquivo AppBiblioteca/mobile/app/model/ip.js, altere para o seu IP ou dominio

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
