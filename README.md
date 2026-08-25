# Academic Express BD

API RESTful desenvolvida durante a Unidade Curricular de **Programação Web 2 — Senac RJ**, com o objetivo de aplicar conceitos de desenvolvimento de APIs utilizando Node.js e Express, operações CRUD, banco de dados MySQL, variáveis de ambiente, Connection Pool, Docker e organização da aplicação em camadas.

---

## 1. Descrição

Este projeto consiste no desenvolvimento de uma API REST para gerenciamento de alunos.

A aplicação permite realizar operações de:

- cadastro;
- consulta;
- atualização;
- exclusão de alunos.

Nesta etapa do projeto, o CRUD foi integrado definitivamente ao banco de dados **MySQL 8.4**, substituindo o armazenamento em memória utilizado nas etapas iniciais.

A aplicação utiliza o pacote `mysql2` para comunicação com o banco de dados e um **Connection Pool** para gerenciamento das conexões.

A arquitetura também foi organizada em diferentes camadas:

```text
Requisição HTTP
      ↓
    Route
      ↓
  Controller
      ↓
  Repository
      ↓
    MySQL
```

Essa separação permite organizar melhor as responsabilidades da aplicação e facilita sua manutenção e evolução.

O projeto é desenvolvido para fins acadêmicos na Unidade Curricular de **Programação Web 2 — Senac RJ**.

---

## 2. Funcionalidades

Atualmente, a API possui as seguintes funcionalidades:

- Listagem de alunos;
- Consulta de aluno por ID;
- Cadastro de alunos;
- Atualização de alunos;
- Exclusão de alunos;
- Recebimento de dados em formato JSON;
- Utilização de códigos de status HTTP;
- Utilização de rotas separadas;
- Utilização de Controllers;
- Utilização de Repository;
- Persistência dos dados no MySQL;
- Utilização do pacote `mysql2`;
- Utilização de Connection Pool;
- Configuração de variáveis de ambiente;
- Execução do MySQL utilizando Docker Compose;
- Persistência do banco através de Docker Volume;
- Utilização de consultas SQL parametrizadas;
- Geração automática de ID através do `AUTO_INCREMENT`;
- Tratamento de aluno não encontrado com HTTP `404`;
- Utilização de HTTP `201` para criação de recursos;
- Utilização de HTTP `204` para exclusão sem conteúdo;
- Header `Location` na criação de novos alunos;
- Execução em ambiente de desenvolvimento utilizando Node Watch.

---

## 3. Tecnologias Utilizadas

- Node.js
- Express
- JavaScript
- MySQL 8.4
- mysql2
- Docker
- Docker Compose
- Git
- GitHub

---

## 4. Arquitetura e Organização do Projeto

A estrutura atual do projeto é:

```text
api-rest-express/

├── src/
│   ├── controllers/
│   │   └── AlunoController.js
│   │
│   ├── database/
│   │   └── pool.js
│   │
│   ├── repositories/
│   │   └── AlunoRepository.js
│   │
│   ├── routes/
│   │   └── alunos.routes.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .env.example
├── .gitignore
├── docker-compose.yml
├── package.json
├── package-lock.json
└── README.md
```

### Principais arquivos

- `src/app.js` — configuração da aplicação Express, middlewares e registro das rotas;
- `src/server.js` — responsável pela inicialização do servidor;
- `src/database/pool.js` — configuração do Connection Pool utilizado para comunicação com o MySQL;
- `src/controllers/AlunoController.js` — responsável pela interação HTTP e coordenação das operações de alunos;
- `src/repositories/AlunoRepository.js` — responsável pelas consultas SQL e persistência dos alunos no MySQL;
- `src/routes/alunos.routes.js` — definição das rotas e métodos HTTP relacionados aos alunos;
- `.env` — variáveis de ambiente utilizadas localmente pela aplicação;
- `.env.example` — modelo das variáveis de ambiente, sem informações sensíveis;
- `.gitignore` — arquivos e diretórios que não devem ser versionados;
- `docker-compose.yml` — configuração do container MySQL e do volume utilizado para persistência;
- `package.json` — informações do projeto, scripts e dependências;
- `package-lock.json` — registro das versões das dependências instaladas;
- `README.md` — documentação do projeto.

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

## 5. Responsabilidade das Camadas

A aplicação utiliza uma arquitetura dividida em três camadas principais.

### Routes

As Routes são responsáveis por mapear:

```text
Método HTTP + URL
```

para determinado método do Controller.

Exemplo:

```text
GET /alunos
        ↓
AlunoController.index()
```

---

### Controller

O Controller é responsável pela interação com HTTP.

Ele trabalha com:

```javascript
req
res
```

Suas responsabilidades incluem:

- receber parâmetros da requisição;
- receber dados do `req.body`;
- chamar o Repository;
- definir o status HTTP;
- retornar a resposta ao cliente.

---

### Repository

O Repository é responsável pela persistência dos dados.

Nele estão concentradas as operações SQL:

```text
SELECT
INSERT
UPDATE
DELETE
```

O Repository conhece:

- MySQL;
- SQL;
- Connection Pool.

O Repository **não conhece**:

```text
req
res
```

Dessa forma, a responsabilidade de HTTP permanece no Controller.

---

## 6. Fluxo da Aplicação

O fluxo de uma requisição é:

```text
Cliente
   ↓
HTTP Request
   ↓
Route
   ↓
Controller
   ↓
Repository
   ↓
Connection Pool
   ↓
MySQL
   ↓
Repository
   ↓
Controller
   ↓
HTTP Response
```

Exemplo:

```text
GET /alunos/1
      ↓
alunos.routes.js
      ↓
AlunoController.show()
      ↓
AlunoRepository.findById()
      ↓
SELECT ... FROM alunos WHERE id = ?
      ↓
MySQL
      ↓
Aluno
      ↓
HTTP 200
```

---

## 7. Pré-requisitos

Antes de executar o projeto, é necessário possuir:

- Node.js;
- npm;
- Git;
- Docker;
- Docker Compose.

---

## 8. Instalação

### 8.1 Clone o repositório

```bash
git clone https://github.com/matheuspessoa14/academic-express-bd.git
```

### 8.2 Acesse a pasta do projeto

```bash
cd academic-express-bd
```

### 8.3 Instale as dependências

```bash
npm install
```

---

## 9. Configuração das Variáveis de Ambiente

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

Essas configurações são utilizadas pela aplicação através de:

```javascript
process.env
```

O arquivo `.env` não deve ser enviado ao repositório Git, pois pode conter informações sensíveis.

O projeto utiliza um `.gitignore` contendo:

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

## 10. Execução do Projeto

### 10.1 Banco de dados com Docker

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

---

### 10.2 Ambiente de desenvolvimento

Para iniciar a aplicação:

```bash
npm run dev
```

O script utilizado é:

```text
node --watch --env-file=.env src/server.js
```

Dessa forma, o Node.js:

1. carrega as variáveis presentes no `.env`;
2. executa o servidor;
3. monitora os arquivos da aplicação;
4. reinicia automaticamente o servidor quando ocorrem alterações.

A aplicação será disponibilizada em:

```text
http://localhost:3000
```

---

### 10.3 Ambiente de produção

Para iniciar a aplicação sem o modo de desenvolvimento:

```bash
npm start
```

O script utilizado é:

```text
node --env-file=.env src/server.js
```

---

### 10.4 Parando o ambiente Docker

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

## 11. Conexão com o MySQL

A comunicação entre a API e o banco de dados é realizada utilizando o pacote:

```text
mysql2
```

A arquitetura de conexão é:

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

---

## 12. Repository e Consultas SQL

O `AlunoRepository` concentra as operações de persistência dos alunos.

As principais operações são:

```text
findAll()
findById()
create()
update()
delete()
```

### SELECT

Para listar alunos:

```sql
SELECT id, nome, curso
FROM alunos
ORDER BY id
```

Para buscar um aluno:

```sql
SELECT id, nome, curso
FROM alunos
WHERE id = ?
```

---

### INSERT

Para cadastrar um aluno:

```sql
INSERT INTO alunos (nome, curso)
VALUES (?, ?)
```

O ID é gerado automaticamente pelo MySQL através do:

```text
AUTO_INCREMENT
```

O valor gerado pode ser recuperado através de:

```javascript
result.insertId
```

---

### UPDATE

Para atualizar um aluno:

```sql
UPDATE alunos
SET nome = ?, curso = ?
WHERE id = ?
```

O resultado da operação é verificado através de:

```javascript
result.affectedRows
```

---

### DELETE

Para excluir um aluno:

```sql
DELETE FROM alunos
WHERE id = ?
```

Também é utilizado:

```javascript
result.affectedRows
```

para verificar se algum registro foi removido.

---

## 13. Consultas SQL Parametrizadas

As consultas utilizam parâmetros:

```sql
WHERE id = ?
```

com os valores enviados separadamente:

```javascript
[id]
```

Exemplo:

```javascript
pool.execute(
  'SELECT id, nome, curso FROM alunos WHERE id = ?',
  [id]
)
```

Essa abordagem evita a construção direta de SQL utilizando valores recebidos do usuário.

Não utilizamos consultas como:

```javascript
`SELECT * FROM alunos WHERE id = ${id}`
```

Os valores externos são enviados separadamente da instrução SQL.

---

## 14. Endpoints da API

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/` | Retorna uma mensagem da API |
| GET | `/alunos` | Lista todos os alunos |
| GET | `/alunos/:id` | Consulta um aluno pelo ID |
| POST | `/alunos` | Cadastra um novo aluno |
| PUT | `/alunos/:id` | Atualiza um aluno |
| DELETE | `/alunos/:id` | Exclui um aluno |

---

## 15. Exemplos de Requisição e Resposta

Os endpoints podem ser testados utilizando o **Postman**, Insomnia ou outras ferramentas de requisição HTTP.

### 15.1 Verificar a API

```http
GET /
```

Resposta:

```json
{
  "mensagem": "API REST funcionando"
}
```

Status:

```text
200 OK
```

---

### 15.2 Listar alunos

```http
GET /alunos
```

Resposta:

```json
[
  {
    "id": 1,
    "nome": "Matheus",
    "curso": "ADS"
  },
  {
    "id": 2,
    "nome": "Aquiles",
    "curso": "SI"
  }
]
```

Status:

```text
200 OK
```

---

### 15.3 Consultar aluno por ID

```http
GET /alunos/1
```

Resposta:

```json
{
  "id": 1,
  "nome": "Matheus",
  "curso": "ADS"
}
```

Status:

```text
200 OK
```

Caso o aluno não exista:

```http
GET /alunos/999
```

Resposta:

```json
{
  "mensagem": "Aluno não encontrado"
}
```

Status:

```text
404 Not Found
```

---

### 15.4 Cadastrar aluno

```http
POST /alunos
```

Header:

```text
Content-Type: application/json
```

Body:

```json
{
  "nome": "Pedro",
  "curso": "ADS"
}
```

O `id` não precisa ser enviado, pois o MySQL utiliza `AUTO_INCREMENT`.

Resposta:

```json
{
  "id": 5,
  "nome": "Pedro",
  "curso": "ADS"
}
```

Status:

```text
201 Created
```

A resposta também possui um header:

```text
Location: /alunos/5
```

indicando o endereço do recurso criado.

---

### 15.5 Atualizar aluno

```http
PUT /alunos/5
```

Body:

```json
{
  "nome": "Pedro Silva",
  "curso": "Sistemas de Informação"
}
```

Resposta:

```json
{
  "id": 5,
  "nome": "Pedro Silva",
  "curso": "Sistemas de Informação"
}
```

Status:

```text
200 OK
```

Caso o aluno não exista:

```text
404 Not Found
```

---

### 15.6 Excluir aluno

```http
DELETE /alunos/5
```

Caso o aluno seja removido:

```text
204 No Content
```

O status `204` não possui corpo na resposta.

Caso o ID não exista:

```json
{
  "mensagem": "Aluno não encontrado"
}
```

Status:

```text
404 Not Found
```

---

## 16. Autenticação

A aplicação **não possui sistema de autenticação de usuários nesta etapa do projeto**.

As rotas da API podem ser acessadas sem utilização de token ou credenciais.

O usuário:

```text
api_user
```

configurado no MySQL é utilizado para controle de acesso da aplicação ao banco de dados e não representa autenticação dos usuários da API.

---

## 17. Tratamento de Erros

Nesta etapa, ainda não foi implementado um sistema de tratamento de erros centralizado.

Entretanto, alguns cenários já possuem tratamento específico.

### Aluno não encontrado

Quando um aluno não é encontrado:

```text
404 Not Found
```

Resposta:

```json
{
  "mensagem": "Aluno não encontrado"
}
```

A decisão de retornar `404` pertence ao Controller, pois o Controller é responsável pela comunicação HTTP.

O Repository apenas informa que o registro não foi encontrado.

---

### Exclusão sem conteúdo

Quando um aluno é removido com sucesso:

```text
204 No Content
```

O Repository retorna:

```text
true
```

e o Controller decide que a resposta HTTP apropriada é:

```text
204
```

---

### Principais códigos HTTP utilizados

- `200` — requisição realizada com sucesso;
- `201` — recurso criado com sucesso;
- `204` — operação realizada sem conteúdo na resposta;
- `400` — requisição inválida;
- `404` — recurso não encontrado;
- `500` — erro interno do servidor.

O tratamento centralizado de erros será aprimorado em etapas posteriores.

---

## 18. Testes

O projeto ainda não possui testes automatizados implementados.

Os endpoints foram testados utilizando ferramentas de requisição HTTP, principalmente o **Postman**.

Os testes realizados incluem:

- criação de alunos;
- listagem de alunos;
- consulta por ID;
- atualização de alunos;
- exclusão de alunos;
- consulta de ID inexistente;
- verificação dos códigos HTTP;
- persistência dos dados após reinicialização da aplicação.

Também foram realizadas verificações diretamente no MySQL utilizando consultas como:

```sql
SELECT * FROM alunos;
```

---

## 19. Persistência dos Dados

Diferentemente das primeiras etapas do projeto, os dados dos alunos agora são armazenados diretamente no MySQL.

Dessa forma, reiniciar a aplicação Node.js não remove os registros.

Exemplo:

```text
POST /alunos
      ↓
INSERT
      ↓
MySQL
```

Depois de reiniciar o servidor:

```text
GET /alunos
      ↓
SELECT
      ↓
MySQL
      ↓
Dados continuam disponíveis
```

A persistência é garantida pelo banco de dados e pelo Docker Volume.

---

## 20. Modelo de Dados

A principal entidade utilizada pelo projeto é:

```text
Aluno

├── id
├── nome
└── curso
```

A tabela `alunos` possui a seguinte estrutura:

```sql
CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    curso VARCHAR(100) NOT NULL
);
```

O campo `id`:

- funciona como chave primária;
- possui incremento automático.

Os campos `nome` e `curso`:

- são obrigatórios;
- possuem limite de 100 caracteres.

---

## 21. Regras de Negócio

Nesta etapa, o projeto possui regras de negócio simplificadas.

As principais operações realizadas sobre alunos são:

- cadastrar um aluno;
- consultar todos os alunos;
- consultar um aluno por ID;
- atualizar os dados de um aluno;
- excluir um aluno.

O projeto ainda possui poucas regras de negócio, por isso não foi adicionada uma camada Service.

A arquitetura atual é:

```text
Route
  ↓
Controller
  ↓
Repository
  ↓
MySQL
```

Uma camada Service poderá ser adicionada futuramente caso surjam regras de negócio mais complexas.

---

## 22. Por que não utilizar uma camada Service?

Em aplicações maiores é comum encontrar:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
```

A camada Service é responsável por regras de negócio.

Porém, neste momento o CRUD possui regras simples.

Adicionar uma Service apenas para repassar chamadas como:

```javascript
service.findAll()
```

para:

```javascript
repository.findAll()
```

criaria uma camada sem responsabilidade real.

Por isso, a arquitetura atual utiliza:

```text
Route
  ↓
Controller
  ↓
Repository
```

---

## 23. Extras — Programação Web 2

### 23.1 Docker

Foi adicionada ao projeto uma configuração utilizando **Docker Compose** para execução de um banco de dados MySQL 8.4.

O ambiente utiliza:

- container MySQL;
- banco de dados `api_rest`;
- usuário específico para a aplicação;
- exposição da porta `3306`;
- Docker Volume para persistência dos dados.

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

---

### 23.2 Docker Volume

O volume:

```text
mysql_data
```

é utilizado para armazenar os dados do MySQL fora do ciclo de vida do container.

Dessa forma:

```bash
docker compose down
```

remove o container e a rede, mas mantém os dados armazenados no volume.

Já:

```bash
docker compose down -v
```

remove também os volumes associados ao projeto e, consequentemente, os dados persistidos.

---

### 23.3 ES Modules

O projeto utiliza ES Modules através da configuração:

```json
"type": "module"
```

permitindo a utilização de:

```javascript
import
export
```

---

### 23.4 Node Watch

O projeto utiliza o recurso `watch` do Node.js para reiniciar automaticamente a aplicação durante o desenvolvimento.

O script utilizado é:

```json
"dev": "node --watch --env-file=.env src/server.js"
```

Dessa forma, alterações nos arquivos monitorados provocam automaticamente a reinicialização do servidor.

---

### 23.5 Connection Pool

O acesso ao banco utiliza um Connection Pool fornecido pelo `mysql2`.

O Pool permite o gerenciamento e reutilização de conexões com o MySQL, sendo mais adequado para aplicações que podem receber múltiplas requisições.

---

### 23.6 SQL Parametrizado

As consultas SQL utilizam parâmetros para receber valores externos.

Exemplo:

```javascript
pool.execute(
  'SELECT id, nome, curso FROM alunos WHERE id = ?',
  [id]
)
```

Essa abordagem evita inserir diretamente valores recebidos do usuário dentro da instrução SQL.

---

## 24. Exercícios do Tutorial

Durante o tutorial foram trabalhados os seguintes exercícios:

### Exercício 1 — Teste do CRUD

Foram testados os cinco endpoints principais:

```text
POST   /alunos
GET    /alunos
GET    /alunos/:id
PUT    /alunos/:id
DELETE /alunos/:id
```

---

### Exercício 2 — Persistência

Foram cadastrados alunos e o servidor Node.js foi reiniciado.

Os registros permaneceram disponíveis porque agora estão armazenados no MySQL, e não mais em uma lista em memória.

---

### Exercício 3 — Docker Volume

Foi trabalhado o comportamento:

```bash
docker compose down
```

seguido de:

```bash
docker compose up -d
```

Os dados permanecem disponíveis porque estão armazenados no Docker Volume.

---

### Exercício 4 — HTTP 404

Foi analisado o cenário:

```http
GET /alunos/999
```

O Repository identifica que não existe um registro correspondente.

O Controller é responsável por transformar essa informação em:

```text
404 Not Found
```

Isso ocorre porque o Repository trabalha com persistência, enquanto o Controller trabalha com HTTP.

---

### Exercício 5 — DELETE

Foi analisado o risco de remover:

```sql
WHERE id = ?
```

de uma operação `DELETE`.

Sem a cláusula `WHERE`, uma consulta como:

```sql
DELETE FROM alunos;
```

poderia remover todos os registros da tabela.

Por isso, a cláusula:

```sql
WHERE id = ?
```

é fundamental para limitar a exclusão ao aluno solicitado.

---

## 25. Versionamento e Organização das Branches

O desenvolvimento das atividades segue o padrão de versionamento definido para a Unidade Curricular de Programação Web 2.

Cada atividade possui uma branch no formato:

```text
branch_yyyymmdd
```

As branches utilizadas até o momento são:

```text
branch_20260818
```

Responsável pela etapa inicial de:

- Docker;
- MySQL;
- Docker Volume;
- configuração inicial do banco.

E:

```text
branch_20260825
```

Responsável pelas etapas de:

- `mysql2`;
- variáveis de ambiente;
- Connection Pool;
- conexão Node.js → MySQL;
- CRUD com MySQL;
- Routes;
- Controllers;
- Repository;
- organização da aplicação em camadas.

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
         ├── CRUD no MySQL
         ├── Routes
         ├── Controllers
         └── Repository
```

Após a conclusão e validação das atividades, as branches semanais poderão ser integradas à `main`.

Os commits devem possuir mensagens claras e representar alterações relevantes realizadas durante o desenvolvimento.

---

## 26. Próximas Etapas

O CRUD principal já está funcionando utilizando persistência real no MySQL.

As próximas etapas poderão incluir:

- validação dos dados recebidos;
- validação de parâmetros;
- middleware;
- tratamento centralizado de erros;
- rota 404;
- respostas mais consistentes;
- encerramento adequado do Connection Pool;
- possíveis regras de negócio;
- documentação com Swagger/OpenAPI;
- testes automatizados.

A arquitetura poderá evoluir para:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
MySQL
```

caso o projeto passe a possuir regras de negócio que justifiquem a criação da camada Service.

---

## 27. Autor

**Nome:** Matheus Pessoa Telles de Oliveira

**Unidade Curricular:** Programação Web 2

**Instituição:** Senac RJ

**GitHub:** https://github.com/matheuspessoa14

---

## 28. Licença e Uso Acadêmico

Projeto desenvolvido para fins acadêmicos na Unidade Curricular de **Programação Web 2 — Senac RJ**.

O código poderá ser utilizado para avaliação e acompanhamento acadêmico durante o curso.