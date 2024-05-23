# Comanda Digital
## Estrutura de Pastas

<p>├── libs</p>
<p>│   ├── boot.js</p>
<p>│   ├── config.js</p>
<p>│   ├── middlewares.js</p>
<p>├── models</p>
<p>│   ├── order.js</p>
<p>│   ├── products.js</p>
<p>│   ├── tablesDB.js</p>
<p>│   ├── user.js</p>
<p>├── node_modules</p>
<p>├── routes</p>
<p>│   ├── index.js</p>
<p>│   ├── order.js</p>
<p>│   ├── products.js</p>
<p>│   ├── tablesDB.js</p>
<p>│   ├── user.js</p>
<p>├── db.js</p>
<p>├── index.js</p>
<p>├── ordergenius.sqlite</p>
<p>├── package-lock.json</p>
<p>├── package.json</p>


## Descrição do Projeto
<p>
    O projeto Comanda Digital é uma API para gerenciamento de pedidos em um sistema de comanda eletrônica. Esta API permite o controle de pedidos, produtos, mesas e usuários, facilitando a operação de restaurantes e bares.
</p>

## Estrutura do Projeto

### libs/: Contém scripts de configuração e middlewares utilizados na aplicação.

<p>boot.js: Configurações de inicialização do servidor.</p>
<p>config.js: Configurações gerais do sistema.</p>
<p>middlewares.js: Middlewares personalizados para a aplicação.</p>

### routes/: Contém os arquivos de rotas da aplicação.

<p>index.js: Rota principal.</p>
<p>order.js: Rotas relacionadas aos pedidos.</p>
<p>products.js: Rotas relacionadas aos produtos.</p>
<p>tablesDB.js: Rotas relacionadas às mesas.</p>
<p>user.js: Rotas relacionadas aos usuários..</p>

### db.js: Configuração do banco de dados SQLite.

### index.js: Arquivo principal que inicia o servidor.
### ordergenius.sqlite: Banco de dados SQLite utilizado pela aplicação.<

### package-lock.json: Arquivo gerado automaticamente pelo npm contendo informações exatas das versões das dependências instaladas.

### package.json: Arquivo de configuração do npm contendo informações sobre o projeto e suas dependências.


## Scripts Disponíveis
<p>No arquivo package.json, está configurado o seguinte script:</p>

<p>start: Inicia a aplicação utilizando o babel-node.</p>

<p>Para iniciar a aplicação, execute:</p>

<p>npm start</p>


## Dependências


# A aplicação utiliza as seguintes dependências:

### babel-cli: Ferramenta para transpilar código ES6/ES7 para ES5.
### bcrypt: Biblioteca para hashing de senhas.
### consign: Utilitário para autoload de scripts.
### express: Framework web para Node.js.
### jimp: Biblioteca para manipulação de imagens.
### jwt-simple: Implementação de JSON Web Token.
### passport: Middleware para autenticação.
### passport-jwt: Estratégia de autenticação JWT para Passport.
### qrcode: Biblioteca para geração de QR codes.
### qrcode-reader: Biblioteca para leitura de QR codes.
### sequelize: ORM para Node.js.
### sqlite3: Driver SQLite para Node.js.


## Autor
<p>Matheus | Olympio</p>

## Licença

<p>Este projeto está licenciado sob a licença ISC.</p>