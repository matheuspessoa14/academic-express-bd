# Academic Express BD

API RESTful desenvolvida durante a Unidade Curricular de **Programação Web 2 — Senac RJ**, com o objetivo de aplicar conceitos de desenvolvimento de APIs utilizando Node.js e Express, operações CRUD, banco de dados MySQL, variáveis de ambiente, conexão com banco de dados e conteinerização com Docker.

## 1. Descrição

Este projeto consiste no desenvolvimento de uma API REST para gerenciamento de alunos.

A aplicação permite realizar operações de cadastro, consulta, atualização e exclusão de alunos. Nesta etapa do projeto, as operações CRUD ainda utilizam uma lista em memória como mock.

O projeto também possui uma integração com o banco de dados **MySQL 8.4**, executado em um container Docker. A comunicação entre a aplicação Node.js e o MySQL é realizada utilizando o pacote `mysql2` e um **Connection Pool**.

Nesta etapa, a conexão com o banco de dados já foi implementada e validada por meio de uma consulta `SELECT 1`. A migração completa das operações CRUD do armazenamento em memória para o MySQL será realizada nas próximas etapas do projeto.

O projeto é desenvolvido para fins acadêmicos na Unidade Curricular de **Programação Web 2 — Senac RJ**.

---

## 2. Funcionalidades

Atualmente, a API possui as seguintes funcionalidades:

* Listagem de alunos;
* Consulta de aluno por ID;
* Cadastro de alunos;
* Atualização de alunos;
* Exclusão de alunos;
* Recebimento de dados em formato JSON;
* Utilização de códigos de status HTTP;
* Execução em ambiente de desenvolvimento;
* Conexão com banco de dados MySQL;
* Utilização do pacote `mysql2`;
* Utilização de Connection Pool;
* Configuração de variáveis de ambiente;
* Execução do MySQL utilizando Docker Compose;
* Persistência do banco através de Docker Volume;
* Validação da conexão com o MySQL utilizando `SELECT 1`.

> **Observação:** nesta etapa, as operações CRUD de alunos ainda utilizam uma lista em memória. A integração dessas operações com consultas SQL será implementada posteriormente.

---

## 3. Tecnologias Utilizadas

* Node.js
* Express
* JavaScript
* Nodemon
* MySQL 8.4
* mysql2
* Docker
* Docker Compose
* Git
* GitHub

---

## 4. Arquitetura e Organização do Projeto

A estrutura atual do projeto é:

```text
api-rest-express/
├── src/
│   ├── database/
│   │   └── pool.js
│   ├── app.js
│   └── server.js
├── .env
├── .env.example
├── .gitignore
├── docker-compose.yml
├── package.json
├── package-lock.json
└── README.md
```

### Principais arquivos

* `src/app.js` — configuração da aplicação Express, middlewares e rotas da API;
* `src/server.js` — responsável pela inicialização do servidor e validação da conexão com o banco;
* `src/database/pool.js` — configuração do Connection Pool utilizado para comunicação com o MySQL;
* `.env` — variáveis de ambiente utilizadas localmente pela aplicação;
* `.env.example` — modelo das variáveis de ambiente, sem informações sensíveis;
* `.gitignore` — arquivos e diretórios que não devem ser versionados;
* `docker-compose.yml` — configuração do container MySQL e do volume utilizado para persistência;
* `package.json` — informações do projeto, scripts e dependências;
* `package-lock.json` — registro das versões das dependências instaladas;
* `README.md` — documentação do projeto.

A aplicação utiliza **ES Modules**, através da configuração:

```json
"type": "module"
```

permitindo a utilização de:

```javascript
import
export
```

---

## 5. Pré-requisitos

Antes de executar o projeto, é necessário possuir:

* Node.js;
* npm;
* Git;
* Docker;
* Docker Compose.

---

## 6. Instalação

### 6.1 Clone o repositório

```bash
git clone https://github.com/matheuspessoa14/academic-express-bd.git
```

### 6.2 Acesse a pasta do projeto

```bash
cd academic-express-bd
```

### 6.3 Instale as dependências

```bash
npm install
```

---

## 7. Configuração das Variáveis de Ambiente

A aplicação utiliza um arquivo `.env` para armazenar as configurações do ambiente.

Exemplo:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=api_user
DB_PASSWORD=api123
DB_NAME=api_rest
```

Essas configurações são utilizadas pela aplicação por meio de `process.env`.

O arquivo `.env` não deve ser enviado ao repositório Git, pois pode conter informações sensíveis.

Para isso, o projeto utiliza um `.gitignore` contendo:

```gitignore
node_modules/
.env
```

Também existe um arquivo `.env.example`, que pode ser versionado:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=
DB_PASSWORD=
DB_NAME=api_rest
```

Em aplicações reais, informações como senhas, tokens, chaves de API e credenciais devem ser protegidas e não devem ser armazenadas diretamente no código-fonte ou enviadas ao repositório.

---

## 8. Execução do Projeto

### 8.1 Banco de dados com Docker

Antes de iniciar a aplicação, certifique-se de que o Docker Desktop está em execução.

Para criar e iniciar o container MySQL:

```bash
docker compose up -d
```

Para verificar o container:

```bash
docker compose ps
```

O ambiente utiliza:

```text
Container: mysql-api-rest
Imagem: mysql:8.4
Banco: api_rest
Usuário: api_user
Porta: 3306
Volume: mysql_data
```

Para acessar o MySQL utilizando o usuário da aplicação:

```bash
docker exec -it mysql-api-rest mysql -u api_user -p
```

Senha utilizada no ambiente acadêmico:

```text
api123
```

### 8.2 Ambiente de desenvolvimento

Para iniciar a aplicação:

```bash
npm run dev
```

O script utiliza o recurso de variáveis de ambiente do Node.js:

```text
node --watch --env-file=.env src/server.js
```

Dessa forma, o Node.js:

1. carrega as variáveis presentes no `.env`;
2. executa o servidor;
3. reinicia automaticamente a aplicação quando os arquivos são alterados.

A aplicação será disponibilizada em:

```text
http://localhost:3000
```

### 8.3 Parando o ambiente Docker

Para parar e remover o container e a rede:

```bash
docker compose down
```

O volume utilizado pelo banco permanece disponível.

Para remover também os volumes:

```bash
docker compose down -v
```

Esse segundo comando remove os dados armazenados no volume.

---

## 9. Conexão com o MySQL

A comunicação entre a API e o banco de dados é realizada utilizando o pacote `mysql2`.

A arquitetura atual é:

```text
HTTP
 ↓
Express
 ↓
mysql2
 ↓
Connection Pool
 ↓
MySQL
```

O Connection Pool é configurado em:

```text
src/database/pool.js
```

Exemplo:

```javascript
import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export default pool
```

O Pool permite que a aplicação reutilize conexões com o banco de dados, evitando a necessidade de criar uma nova conexão para cada requisição.

Antes de iniciar o servidor HTTP, a aplicação executa:

```sql
SELECT 1
```

Essa consulta não acessa nenhuma tabela. Ela é utilizada apenas para verificar se a aplicação consegue estabelecer comunicação com o MySQL.

---

## 10. Endpoints da API

| Método | Endpoint      | Descrição                   |
| ------ | ------------- | --------------------------- |
| GET    | `/`           | Retorna uma mensagem da API |
| GET    | `/alunos`     | Lista todos os alunos       |
| GET    | `/alunos/:id` | Consulta um aluno pelo ID   |
| POST   | `/alunos`     | Cadastra um novo aluno      |
| PUT    | `/alunos/:id` | Atualiza um aluno           |
| DELETE | `/alunos/:id` | Exclui um aluno             |

> Nesta etapa, os endpoints de alunos ainda utilizam o armazenamento em memória. A integração desses endpoints com o MySQL será realizada posteriormente.

---

## 11. Exemplos de Requisição e Resposta

### 11.1 Verificar a API

```http
GET /
```

Exemplo de resposta:

```json
{
  "mensagem": "API REST funcionando"
}
```

### 11.2 Listar alunos

```http
GET /alunos
```

Exemplo de resposta:

```json
[
  {
    "id": 1,
    "nome": "Bruno",
    "curso": "ADS"
  },
  {
    "id": 2,
    "nome": "Maria",
    "curso": "ADS"
  }
]
```

### 11.3 Cadastrar aluno

```http
POST /alunos
Content-Type: application/json
```

Corpo da requisição:

```json
{
  "id": 5,
  "nome": "Carlos",
  "curso": "ADS"
}
```

---

## 12. Autenticação

A aplicação **não possui sistema de autenticação nesta etapa do projeto**.

As rotas atuais podem ser acessadas sem utilização de token ou credenciais.

O usuário `api_user` configurado no MySQL é utilizado para controle de acesso da aplicação ao banco de dados e não representa autenticação dos usuários da API.

---

## 13. Tratamento de Erros

Nesta etapa, a aplicação ainda não possui um tratamento de erros centralizado.

Entre os principais códigos HTTP trabalhados durante o desenvolvimento estão:

* `200` — requisição realizada com sucesso;
* `201` — recurso criado com sucesso;
* `204` — operação realizada sem conteúdo na resposta;
* `400` — requisição inválida;
* `404` — recurso não encontrado;
* `500` — erro interno do servidor.

A validação da conexão com o banco também possui tratamento para erros de conexão. Caso o MySQL não esteja disponível ou as credenciais estejam incorretas, a aplicação informa o erro e encerra sua inicialização.

O tratamento de erros poderá ser aprimorado durante a evolução do projeto.

---

## 14. Testes

O projeto ainda não possui testes automatizados implementados.

Os endpoints podem ser testados utilizando ferramentas de requisição HTTP, como:

* Postman;
* Insomnia;
* extensões do Visual Studio Code.

Durante esta etapa também foram realizados testes de conexão com o MySQL utilizando:

```sql
SELECT 1;
```

e consultas temporárias para verificar os registros da tabela:

```sql
SELECT * FROM alunos;
```

A conexão com o banco foi validada utilizando o usuário da aplicação e o banco `api_rest`.

---

## 15. Documentação da API

A aplicação ainda não possui documentação utilizando Swagger/OpenAPI.

Os endpoints disponíveis estão documentados neste README.

A documentação poderá ser aprimorada posteriormente utilizando padrões como OpenAPI/Swagger.

---

## 16. Modelo de Dados

A principal entidade utilizada pelo projeto é:

```text
Aluno
├── id
├── nome
└── curso
```

No MySQL, a tabela `alunos` possui a seguinte estrutura:

```sql
CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    curso VARCHAR(100) NOT NULL
);
```

O campo `id` funciona como chave primária e possui incremento automático.

Os campos `nome` e `curso` são obrigatórios.

Exemplo de registros utilizados durante os testes:

```text
Matheus | ADS
Aquiles | SI
Breno   | CC
```

---

## 17. Regras de Negócio

Nesta etapa inicial, o projeto possui regras de negócio simplificadas.

As principais operações realizadas sobre alunos são:

* cadastrar um aluno;
* consultar todos os alunos;
* consultar um aluno por ID;
* atualizar os dados de um aluno;
* excluir um aluno.

Atualmente, as operações da API utilizam uma lista em memória como mock. Dessa forma, alterações realizadas nessa lista são perdidas quando a aplicação é reiniciada.

O banco de dados MySQL já está configurado, possui a tabela `alunos` e pode ser acessado pela aplicação utilizando o Connection Pool.

A substituição do armazenamento em memória por consultas SQL reais será realizada em uma etapa posterior.

---

## 18. Extras — Programação Web 2

### 18.1 Docker

Foi adicionada ao projeto uma configuração utilizando **Docker Compose** para execução de um banco de dados MySQL 8.4.

O ambiente utiliza:

* container MySQL;
* banco de dados `api_rest`;
* usuário específico para a aplicação;
* exposição da porta `3306`;
* Docker Volume para persistência dos dados.

Configuração utilizada:

```yaml
services:

  mysql:
    image: mysql:8.4
    container_name: mysql-api-rest

    restart: always

    environment:
      MYSQL_ROOT_PASSWORD: root123
      MYSQL_DATABASE: api_rest
      MYSQL_USER: api_user
      MYSQL_PASSWORD: api123

    ports:
      - "3306:3306"

    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

### 18.2 Docker Volume

O volume `mysql_data` é utilizado para armazenar os dados do MySQL fora do ciclo de vida do container.

Dessa forma, executar:

```bash
docker compose down
```

remove o container e a rede, mas mantém os dados armazenados no volume.

Já:

```bash
docker compose down -v
```

remove também os volumes associados ao projeto e, consequentemente, os dados persistidos.

### 18.3 ES Modules

O projeto utiliza ES Modules através da configuração:

```json
"type": "module"
```

permitindo a utilização de:

```javascript
import
export
```

### 18.4 Nodemon / Node Watch

O projeto utiliza o recurso de `watch` do Node.js para reiniciar automaticamente a aplicação durante o desenvolvimento.

O script utilizado é:

```json
"dev": "node --watch --env-file=.env src/server.js"
```

Dessa forma, alterações nos arquivos monitorados provocam automaticamente a reinicialização do servidor.

### 18.5 Connection Pool

O acesso ao banco utiliza um Connection Pool fornecido pelo `mysql2`.

O Pool permite o gerenciamento e reutilização de conexões com o MySQL, sendo mais adequado para aplicações que podem receber múltiplas requisições.

---

## 19. Versionamento e Organização das Branches

O desenvolvimento das atividades segue o padrão de versionamento definido para a Unidade Curricular de Programação Web 2.

Cada semana possui uma branch no formato:

```text
branch_yyyymmdd
```

A atividade anterior foi desenvolvida na branch:

```text
branch_20260818
```

A etapa atual está sendo desenvolvida na branch:

```text
branch_20260825
```

As branches são criadas a partir da `main`.

Fluxo utilizado:

```text
main
 │
 ├── branch_20260818
 │       │
 │       ├── Docker + MySQL
 │       ├── Docker Volume
 │       └── configuração inicial
 │
 └── branch_20260825
         │
         ├── mysql2
         ├── .env
         ├── Connection Pool
         └── conexão Node.js → MySQL
```

Após a conclusão e validação das atividades, as branches semanais poderão ser integradas à `main`.

Os commits devem possuir mensagens claras e representar alterações relevantes realizadas durante o desenvolvimento.

---

## 20. Próximas Etapas

A próxima etapa do projeto será substituir gradualmente o armazenamento em memória por persistência real no MySQL.

A arquitetura planejada para as próximas etapas é:

```text
Route
  ↓
Controller
  ↓
Repository
  ↓
MySQL
```

Dessa forma, as responsabilidades da aplicação serão separadas em diferentes camadas, evitando colocar consultas SQL diretamente nas rotas ou no arquivo responsável pela inicialização do servidor.

Posteriormente, o CRUD completo de alunos será integrado ao banco de dados.

---

## 21. Autor

**Nome:** Matheus Pessoa Telles de Oliveira

**Unidade Curricular:** Programação Web 2

**Instituição:** Senac RJ

**GitHub:** https://github.com/matheuspessoa14

---

## 22. Licença e Uso Acadêmico

Projeto desenvolvido para fins acadêmicos na Unidade Curricular de **Programação Web 2 — Senac RJ**.

O código poderá ser utilizado para avaliação e acompanhamento acadêmico durante o curso.
