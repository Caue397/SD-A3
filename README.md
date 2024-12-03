# Sistema de Livraria

Este repositório contém o código-fonte do sistema de livraria, um projeto desenvolvido para permitir a compra e venda de livros entre usuários. A aplicação oferece autenticação segura por meio de JWT, garantindo que apenas usuários autenticados possam listar seus livros para venda. O sistema conta com duas páginas principais: a Home e a página "Meus Livros", onde o usuário pode visualizar todos os livros que possui.

---

## Funcionalidades Principais

- **Autenticação JWT**: Usuários precisam estar autenticados para vender seus livros.
- **Compra e Venda de Livros**: Permite comprar livros de outros usuários e listar seus próprios livros para venda.
- **Gerenciamento de Livros**: Na página "Meus Livros", o usuário pode visualizar todos os livros que já adquiriu.

---

## Estrutura do Projeto

### Front-end

O front-end foi desenvolvido com as seguintes tecnologias:

- **[Typescript](https://www.typescriptlang.org/)**: Linguagem tipada para maior robustez no desenvolvimento.
- **[React](https://reactjs.org/)**: Biblioteca para construção de interfaces dinâmicas.
- **[Next.js](https://nextjs.org/)**: Framework React para aplicações server-side rendering (SSR) e static site generation (SSG).
- **[Zustand](https://zustand-demo.pmnd.rs/)**: Gerenciador de estado leve e flexível.
- **[Framer Motion](https://www.framer.com/motion/)**: Biblioteca para animações fluidas e interativas.
- **[Axios](https://axios-http.com/)**: Cliente HTTP para consumir a API do back-end.
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework de CSS para estilização rápida e responsiva.

### Back-end

O back-end foi desenvolvido com as seguintes tecnologias:

- **[Java](https://www.java.com/)**: Linguagem principal do back-end.
- **[MySQL](https://www.mysql.com/)**: Banco de dados relacional para armazenar as informações dos usuários e livros.
- **[XAMPP](https://www.apachefriends.org/index.html)**: Ambiente de desenvolvimento para gerenciar o MySQL.
- **[Spring Boot](https://spring.io/projects/spring-boot)**: Framework para criação de APIs RESTful.
- **[Spring Security](https://spring.io/projects/spring-security)**: Módulo de segurança para autenticação e autorização.
- **[JWT](https://jwt.io/)**: JSON Web Tokens para autenticação segura.
- **[Bcrypt](https://bcrypt-generator.com/)**: Biblioteca para criptografia de senhas.

---

## Estrutura das Páginas

1. **Home**:
   - Exibe os livros disponíveis para compra.
   - Funcionalidade de busca e filtragem.

2. **Meus Livros**:
   - Lista os livros adquiridos pelo usuário.
   - Permite gerenciar os livros comprados.

---

## Como Executar o Projeto

### Pré-requisitos

- **Node.js** (versão mais recente)
- **XAMPP**
- **Java JDK**
- Gerenciador de pacotes **npm** ou **yarn**

### Back-end

1. Clone o repositório e navegue até a pasta do back-end.
2. Configure o banco de dados MySQL no XAMPP.
3. Atualize o arquivo `application.properties` com as credenciais do banco de dados.
4. Compile e execute o servidor Spring Boot:
   ```bash
   mvn spring-boot:run
   ```

### Front-end

1. Navegue até a pasta do front-end.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

Acesse a aplicação no navegador em `http://localhost:3000`.

---

## Melhorias Futuras

- Implementar mais funcionalidades para gerenciamento de livros.
- Adicionar mais filtros para busca de livros.
- Criar uma interface administrativa para gerenciar usuários e livros.
