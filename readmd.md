<h1>Comanda Digital</h1>
<h3>Estrutura de Pastas</h3>

<p>

├── libs
│   ├── boot.js
│   ├── config.js
│   ├── middlewares.js
├── models
│   ├── order.js
│   ├── products.js
│   ├── tablesDB.js
│   ├── user.js
├── node_modules
├── routes
│   ├── index.js
│   ├── order.js
│   ├── products.js
│   ├── tablesDB.js
│   ├── user.js
├── db.js
├── index.js
├── ordergenius.sqlite
├── package-lock.json
├── package.json
</p>

<h3>Descrição do Projeto</h3>
<p>
    O projeto Comanda Digital é uma API para gerenciamento de pedidos em um sistema de comanda eletrônica. Esta API permite o controle de pedidos, produtos, mesas e usuários, facilitando a operação de restaurantes e bares.
</p>

<h3>Estrutura do Projeto</h3>

<h4>libs/: Contém scripts de configuração e middlewares utilizados na aplicação.</h4>

<p>boot.js: Configurações de inicialização do servidor.</p>
<p>config.js: Configurações gerais do sistema.</p>
<p>middlewares.js: Middlewares personalizados para a aplicação.</p>

<h4>routes/: Contém os arquivos de rotas da aplicação.</h4>

<p>index.js: Rota principal.</p>
<p>order.js: Rotas relacionadas aos pedidos.</p>
<p>products.js: Rotas relacionadas aos produtos.</p>
<p>tablesDB.js: Rotas relacionadas às mesas.</p>
<p>user.js: Rotas relacionadas aos usuários..</p>

<h5>db.js: Configuração do banco de dados SQLite.</h5>

<h5>index.js: Arquivo principal que inicia o servidor.</h5>

<h5>ordergenius.sqlite: Banco de dados SQLite utilizado pela aplicação.</h5>

<h5>package-lock.json: Arquivo gerado automaticamente pelo npm contendo informações exatas das versões das dependências instaladas.</h5>

<h5>package.json: Arquivo de configuração do npm contendo informações sobre o projeto e suas dependências.</h5>


<h2>Scripts Disponíveis</h2>
<p>No arquivo package.json, está configurado o seguinte script:

start: Inicia a aplicação utilizando o babel-node.

Para iniciar a aplicação, execute:

npm start

</p>

<h2>Dependências</h2>

<p>
A aplicação utiliza as seguintes dependências:

babel-cli: Ferramenta para transpilar código ES6/ES7 para ES5.
bcrypt: Biblioteca para hashing de senhas.
consign: Utilitário para autoload de scripts.
express: Framework web para Node.js.
jimp: Biblioteca para manipulação de imagens.
jwt-simple: Implementação de JSON Web Token.
passport: Middleware para autenticação.
passport-jwt: Estratégia de autenticação JWT para Passport.
qrcode: Biblioteca para geração de QR codes.
qrcode-reader: Biblioteca para leitura de QR codes.
sequelize: ORM para Node.js.
sqlite3: Driver SQLite para Node.js.
</p>

<h2>Autor</h2>
<p>Matheus | Olympio</p>

<h2>Licença</h2>

<p>Este projeto está licenciado sob a licença ISC.</p>