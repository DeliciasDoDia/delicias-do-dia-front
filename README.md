# Delícias do Dia – Cloud Developing 2025/2

> CRUD simples + API Gateway + Lambda /report + RDS

**Grupo**:

1. 10420059 - Geovanna da Silva Lima - Construção do documento, README, diagrama de arquitetura e suporte no Lambda/Gateway.
1. 10428380 - Guilherme Soares Santos  - Construção do Lambda e Gateway.
1. 10419319 - Lucas Cesar Kato - Construção do Lambda e Gateway.
1. 10388037 - Pedro Henrique Mansano Fernandes - Construção do EC2 + Docker e Amazon RDS.

## 1. Visão geral
O projeto "Delícias do Dia" tem como objetivo oferecer uma plataforma simples e intuitiva para o gerenciamento de receitas culinárias. O sistema permite que os usuários visualizem receitas já cadastradas e adicionem novas receitas ao catálogo, facilitando o compartilhamento e a organização de ideias gastronômicas.

Desenvolvido com foco em escalabilidade e disponibilidade, o sistema foi implantado na Amazon Web Services (AWS), utilizando uma arquitetura em nuvem composta por serviços gerenciados. A aplicação back-end, desenvolvida em Spring Boot e containerizada no Amazon EC2, é responsável pelo processamento das operações de cadastro, listagem, atualização e exclusão de dados. Os dados são armazenados no Amazon RDS (MySQL), localizado em uma subnet privada, garantindo segurança e isolamento da camada de dados.

O sistema implementa um CRUD completo (Create, Read, Update e Delete) que permite o gerenciamento de receitas e usuários. Através da API, é possível cadastrar novas receitas, visualizar receitas existentes, alterar informações (como nome, ingredientes e modo de preparo) e excluir registros quando necessário. Além disso, o CRUD também inclui o cadastro e gerenciamento de usuários, permitindo a criação de perfis e o controle de acesso às funcionalidades do sistema.

## 2. Arquitetura
A arquitetura do sistema foi desenvolvida utilizando serviços da AWS com o objetivo de garantir escalabilidade, segurança e isolamento entre as camadas de aplicação e dados. O diagrama a seguir representa a estrutura completa do ambiente configurado.

<img width="461" height="772" alt="Diagrama sem nome drawio (1)" src="https://github.com/user-attachments/assets/73e619cc-32e6-4b0c-879d-d194f5327288" />

| Camada | Serviço | Descrição |
|--------|---------|-----------|
| Backend | Amazon EC2 (container Docker com Spring Boot) | Executa a API REST responsável pelo CRUD de receitas e usuários. Processa as requisições recebidas pelo API Gateway e se comunica com o banco de dados RDS. |
| Banco   | Amazon RDS (MySQL)             | Armazena as informações de receitas e usuários. Está configurado em uma subnet privada, sem acesso direto à internet, garantindo segurança e isolamento. |
| Gateway | Amazon API Gateway      | Atua como ponto de entrada da aplicação. Roteia as requisições HTTP: as rotas `/api` são direcionadas ao back-end (EC2) e a rota `/report` é processada pela função Lambda. |
| Função  | AWS Lambda              | Função responsável por consumir a própria API via HTTP e gerar relatórios estatísticos em formato JSON, sem acesso direto ao banco de dados. |

## 3. Como rodar localmente

```bash
# ========================= #
# PARA RODAR O FRONT-END:
# ========================= #

# Etapa 1: Build da aplicação
FROM node:20-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependência e instalar dependências
COPY package.json package-lock.json* ./
RUN npm ci

# Copiar o restante do código e gerar build
COPY . .
RUN npm run build

# Etapa 2: Imagem final (produção)
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copiar apenas o necessário para rodar a aplicação
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]
```
```bash
# ========================= #
# PARA RODAR O BACK-END:
# ========================= #

# Use a imagem oficial do OpenJDK 21 como base
FROM eclipse-temurin:21-jre

# Diretório de trabalho dentro do container
WORKDIR /app

# Copie o arquivo JAR gerado pelo build do projeto para o container
COPY target/*.jar app.jar

# Exponha a porta padrão do Spring Boot
EXPOSE 25000

# Comando para rodar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]
```
