# Delícias do Dia – Cloud Developing 2025/2

> CRUD simples + API Gateway + Lambda /report + RDS + CI/CD

**Grupo**:

1. 10420059 - Geovanna da Silva Lima - responsabilidade
1. 10428380 - Guilherme Soares Santos  - responsabilidade
1. 10419319 - Lucas Cesar Kato - responsabilidade
1. 10388037 - Pedro Henrique Mansano Fernandes - responsabilidade

## 1. Visão geral
<!-- Descreva rapidamente o domínio escolhido, por que foi selecionado e o que o CRUD faz. -->

## 2. Arquitetura

![Diagrama](docs/arquitetura.png)

| Camada | Serviço | Descrição |
|--------|---------|-----------|
| Backend | ECS Fargate (ou EC2 + Docker) | Java Spring Boot |
| Banco   | Amazon RDS              | PostgreSQL / MySQL em subnet privada |
| Gateway | Amazon API Gateway      | Rotas CRUD → ECS · `/report` → Lambda |
| Função  | AWS Lambda              | Consome a API, gera estatísticas JSON |
| CI/CD   | CodePipeline + GitHub   | push → build → ECR → deploy |

## 3. Como rodar localmente

```bash
# Para rodar o front-end:
 docker run -d -p 8080:3000 delicias-do-dia-front

# Para rodar o back-end: 
docker run -d -p 25000:8080 delicias-do-dia-back

# exemplo do prof
cp .env.example .env         # configure variáveis
docker compose up --build
# API em http://localhost:3000
