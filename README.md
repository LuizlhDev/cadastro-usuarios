# Cadastro de Usuarios

Projeto simples de cadastro de usuarios feito para praticar Spring Boot, API REST, JPA, DTO e integracao com um frontend basico.

A ideia do projeto e ter um backend com as operacoes principais de um CRUD e uma tela simples para testar tudo pelo navegador.

## Tecnologias usadas

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- H2 Database
- Lombok
- Maven
- HTML, CSS e JavaScript

## Funcionalidades

- Cadastrar usuario
- Buscar usuario por email
- Atualizar usuario pelo id
- Remover usuario pelo email
- Testar as rotas por uma tela web simples
- Acessar o banco em memoria pelo H2 Console

## Como rodar o projeto

Clone o repositorio e entre na pasta do projeto:

```bash
git clone https://github.com/LuizlhDev/cadastro-usuarios.git
cd cadastro-usuarios
```

No Windows, rode:

```bash
mvnw.cmd spring-boot:run
```

No Linux ou macOS:

```bash
./mvnw spring-boot:run
```

Depois acesse:

```text
http://localhost:8080
```

## H2 Console

O projeto usa banco H2 em memoria. Para acessar o console:

```text
http://localhost:8080/h2-console
```

Use os dados abaixo:

```text
JDBC URL: jdbc:h2:mem:testdb
User Name: sa
Password:
```

A senha fica vazia.

## Endpoints

### Cadastrar usuario

```http
POST /usuario
```

Exemplo de body:

```json
{
  "nome": "Luiz",
  "email": "luiz@email.com"
}
```

### Buscar usuario por email

```http
GET /usuario?email=luiz@email.com
```

### Atualizar usuario por id

```http
PUT /usuario?id=1
```

Exemplo de body:

```json
{
  "nome": "Luiz Atualizado",
  "email": "novo@email.com"
}
```

### Remover usuario por email

```http
DELETE /usuario?email=luiz@email.com
```



## Frontend

O frontend fica em:

```text
src/main/resources/static
```

Ele foi feito com HTML, CSS e JavaScript puro, apenas para testar as funcionalidades do backend sem precisar usar Postman.

## Observacao

Projeto feito para estudo e pratica dos conceitos basicos de Spring Boot.
