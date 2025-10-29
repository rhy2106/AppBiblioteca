# Como rodar o mvp localmente:
## clonar repositorio
> Obs: é preciso ter npm, nodejs instalado
```
git clone git@github.com:rhy2106/AppBiblioteca.git
```
## instalar dependencias
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
npm run dev
```

## Rodar o aplicativo mobile:
1. na pasta AppBiblioteca/mobile execute:
```bash
npx expo start
```
2. e então leia o QRcode que irá aparecer com o aplicativo *expo go*
