# Sumario
- [Funções feitas](#funções-feitas)
- [Como rodar o MVP localmente](#como-rodar-localmente)
  - [Clonar repositório](#clonar-repositorio)
  - [Instalar dependências](#instalar-dependencias)
  - [Rodar o banco de dados](#rodar-o-banco-de-dados)
  - [Rodar o aplicativo mobile](#rodar-o-aplicativo-mobile)
## Funções feitas
- [X] Buscar livro
- [X] Reservar livro
- [X] Registrar Emprestimo
- [X] Registrar Devolucao
- [X] Cadastrar Usuario
- [X] Cadastrar Livro
- [X] Cadastrar Autor
- [X] Cadastrar Genero de Livro
- [X] Controle de Estoque
- [X] Login Admin/Usuario
- [ ] Renovar Emprestimo
- [X] Listar Livros atrasados
- [X] Avaliar Livro
- [ ] Historico de Emprestimo
- [ ] Criar / Editar Lista de Livros
- [ ] Historico de Busca
- [ ] Controle de Usuarios
- [ ] Tinder Livro
- [ ] Doar Livro
- [ ] Livros em Alta / Ranking
- [ ] Sugerir melhorias
- [ ] E-books

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
