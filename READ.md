# Academic Express BD

API RESTful desenvolvida durante a Unidade Curricular de **Programação Web 2**, com o objetivo de aplicar conceitos de desenvolvimento de APIs com Node.js e Express, operações CRUD, banco de dados MySQL e conteinerização com Docker.

## 1. Descrição

Este projeto consiste no desenvolvimento de uma API REST para gerenciamento de alunos.

A aplicação permite realizar operações de cadastro, consulta, atualização e exclusão de alunos. Inicialmente, os dados são armazenados em uma lista em memória utilizada como mock.

Durante a evolução do projeto, será utilizado um banco de dados **MySQL executado em um container Docker**, permitindo posteriormente substituir os dados em memória por dados persistidos em banco.

O projeto é desenvolvido para fins acadêmicos na Unidade Curricular de **Programação Web 2 — Senac RJ**.

## 2. Funcionalidades

Atualmente, a API possui as seguintes funcionalidades:

* Listagem de alunos;
* Consulta de aluno por ID;
* Cadastro de alunos;
* Atualização de alunos;
* Exclusão de alunos;
* Recebimento de dados em formato JSON;
* Utilização de códigos de status HTTP;
* Execução em ambiente de desenvolvimento com Nodemon;
* Configuração do MySQL utilizando Docker Compose;
* Persistência do banco através de Docker Volume.

## 3. Tecnologias Utilizadas

* Node.js
* Express
* JavaScript
* Nodemon
* MySQL 8.4
* Docker
* Docker Compose
* Git
* GitHub

## 4. Arquitetura e Organização do Projeto

A estrutura atual do projeto é:

```text
api-rest-express/
├── src/
│   └── app.js
├── docker-compose.yml
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

### Principais arquivos

* `src/app.js` — configuração da aplicação Express, middlewares e rotas da API;
* `server.js` — responsável pela inicialização do servidor;
* `docker-compose.yml` — configuração do container MySQL e do volume utilizado para persistência;
* `package.json` — informações do projeto, scripts e dependências;
* `package-lock.json` — registro das versões das dependências instaladas.

A aplicação utiliza **ES Modules**, através de `import` e `export`.

## 5. Pré-requisitos

Antes de executar o projeto, é necessário possuir:

* Node.js;
* npm;
* Git;
* Docker;
* Docker Compose.

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

## 7. Configuração das Variáveis de Ambiente

Nesta etapa do projeto ainda não está sendo utilizado um arquivo `.env`.

As configurações do ambiente MySQL utilizado para fins acadêmicos estão definidas no arquivo `docker-compose.yml`.

Em aplicações reais, informações sensíveis como usuários, senhas, tokens e chaves de API não devem ser armazenadas diretamente no código ou enviadas ao repositório Git.

## 8. Execução do Projeto

### Ambiente de desenvolvimento

Execute:

```bash
npm run dev
```

O Nodemon ficará responsável por reiniciar automaticamente o servidor quando forem identificadas alterações nos arquivos.

A aplicação será disponibilizada em:

```text
http://localhost:3000
```

### Banco de dados com Docker

Para criar e iniciar o container MySQL:

```bash
docker compose up -d
```

Para verificar os containers em execução:

```bash
docker ps
```

Para parar e remover os containers:

```bash
docker compose down
```

## 9. Endpoints da API

| Método | Endpoint      | Descrição                   |
| ------ | ------------- | --------------------------- |
| GET    | `/`           | Retorna uma mensagem da API |
| GET    | `/alunos`     | Lista todos os alunos       |
| GET    | `/alunos/:id` | Consulta um aluno pelo ID   |
| POST   | `/alunos`     | Cadastra um novo aluno      |
| PUT    | `/alunos/:id` | Atualiza um aluno           |
| DELETE | `/alunos/:id` | Exclui um aluno             |

## 10. Exemplos de Requisição e Resposta

### Listar alunos

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

### Cadastrar aluno

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

## 11. Autenticação

A aplicação **não possui sistema de autenticação nesta etapa do projeto**.

As rotas atuais podem ser acessadas sem utilização de token ou credenciais.

## 12. Tratamento de Erros

Nesta etapa, a aplicação ainda não possui um tratamento de erros centralizado.

Entre os principais códigos HTTP trabalhados durante o desenvolvimento estão:

* `200` — requisição realizada com sucesso;
* `201` — recurso criado com sucesso;
* `204` — operação realizada sem conteúdo na resposta;
* `400` — requisição inválida;
* `404` — recurso não encontrado;
* `500` — erro interno do servidor.

O tratamento de erros poderá ser aprimorado durante a evolução do projeto.

## 13. Testes

O projeto ainda não possui testes automatizados implementados.

Os endpoints podem ser testados utilizando ferramentas de requisição HTTP, como Postman, Insomnia ou extensões do Visual Studio Code.

## 14. Documentação da API

A aplicação ainda não possui documentação utilizando Swagger/OpenAPI.

Os endpoints disponíveis estão documentados neste README.

## 15. Modelo de Dados

Atualmente, a principal entidade utilizada é:

```text
Aluno
├── id
├── nome
└── curso
```

No MySQL, a tabela `alunos` será estruturada com:

```sql
CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    curso VARCHAR(100) NOT NULL
);
```

O campo `id` funciona como chave primária e possui incremento automático.

Os campos `nome` e `curso` são obrigatórios.

## 16. Regras de Negócio

Nesta etapa inicial, o projeto possui regras de negócio simplificadas.

As principais operações realizadas sobre alunos são:

* cadastrar um aluno;
* consultar todos os alunos;
* consultar um aluno por ID;
* atualizar os dados de um aluno;
* excluir um aluno.

Inicialmente, a API utiliza uma lista em memória como mock. Dessa forma, alterações realizadas nessa lista são perdidas quando a aplicação é reiniciada.

A utilização do MySQL permitirá posteriormente persistir essas informações.

## 17. Extras — Programação Web 2

### Docker

Foi adicionada ao projeto uma configuração utilizando **Docker Compose** para execução de um banco de dados MySQL 8.4.

O ambiente utiliza:

* container MySQL;
* banco de dados `api_rest`;
* usuário específico para a aplicação;
* exposição da porta `3306`;
* Docker Volume para persistência dos dados.

### Docker Volume

O volume `mysql_data` é utilizado para armazenar os dados do MySQL fora do ciclo de vida do container.

Dessa forma, executar:

```bash
docker compose down
```

remove o container, mas mantém os dados armazenados no volume.

Já o comando:

```bash
docker compose down -v
```

também remove os volumes associados ao projeto.

### ES Modules

O projeto utiliza ES Modules através da configuração:

```json
"type": "module"
```

permitindo a utilização de:

```javascript
import
export
```

### Nodemon

O Nodemon é utilizado como dependência de desenvolvimento para reiniciar automaticamente o servidor após alterações no código.

## 18. Versionamento e Organização das Branches

O desenvolvimento das atividades segue o padrão de versionamento definido para a Unidade Curricular de Programação Web 2.

Cada semana possui uma branch no formato:

```text
branch_yyyymmdd
```

A branch desta atividade é:

```text
branch_20260818
```

A branch é criada a partir da `main`.

Fluxo utilizado:

```text
main
  │
  └── branch_20260818
          │
          ├── desenvolvimento
          ├── commits
          └── merge
                │
                ▼
              main
```

Após a conclusão e validação da atividade, será realizado o merge da branch semanal para a `main`.

Os commits devem possuir mensagens claras e representar alterações relevantes realizadas durante o desenvolvimento.

## 19. Autor

**Nome:** Matheus Pessoa Telles de Oliveira
**Unidade Curricular:** Programação Web 2
**Instituição:** Senac RJ

**GitHub:** https://github.com/matheuspessoa14

## 20. Licença e Uso Acadêmico

Projeto desenvolvido para fins acadêmicos na Unidade Curricular de **Programação Web 2 — Senac RJ**.

O código poderá ser utilizado para avaliação e acompanhamento acadêmico durante o curso.
