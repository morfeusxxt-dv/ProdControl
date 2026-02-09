# ProdControl - Sistema de Controle de Produção

Sistema completo para gestão de produção com controle de matérias-primas, produtos e ordens de produção.

## 🚀 Tecnologias

### Backend (Spring Boot)
- Java 21
- Spring Boot 3.3.0
- Spring Data JPA
- PostgreSQL (produção) / H2 (desenvolvimento)
- Jakarta Validation
- Maven

### Frontend (React)
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React Icons
- Axios

### Deploy
- **Backend**: Render.com
- **Frontend**: Vercel

## 📋 Funcionalidades

- ✅ Gestão de Matérias-Primas
- ✅ Gestão de Produtos
- ✅ Ordens de Produção
- ✅ Controle de Estoque
- ✅ Cálculo de Produção Máxima
- ✅ Validação de Dados
- ✅ Tratamento de Erros

## 🛠️ Configuração Local

### Backend
```bash
cd prodcontrol-backend
../apache-maven-3.9.6/bin/mvn spring-boot:run
```

### Frontend
```bash
cd prodcontrol-frontend
npm install
npm run dev
```

## 🌐 Deploy

### Backend (Render.com)
1. Faça upload do projeto
2. Configure as variáveis de ambiente:
   - `DATABASE_URL`
   - `DATABASE_USERNAME`
   - `DATABASE_PASSWORD`
   - `SPRING_PROFILES_ACTIVE=production`
3. Use o `render.yaml` para configuração automática

### Frontend (Vercel)
1. Conecte o repositório ao Vercel
2. Configure a variável `VITE_API_BASE_URL`
3. Ajuste o `vercel.json` com a URL do backend

## 📁 Estrutura do Projeto

```
ProdControl/
├── prodcontrol-backend/     # API Spring Boot
│   ├── src/main/java/
│   └── pom.xml
├── prodcontrol-frontend/    # App React
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── vercel.json            # Config Vercel
└── render.yaml           # Config Render
```

## 🔧 Variáveis de Ambiente

### Backend (Produção)
- `DATABASE_URL`: URL do PostgreSQL
- `DATABASE_USERNAME`: Usuário do BD
- `DATABASE_PASSWORD`: Senha do BD
- `SPRING_PROFILES_ACTIVE`: production

### Frontend (Produção)
- `VITE_API_BASE_URL`: URL da API do backend

## 📝 Licença

Projeto desenvolvido para demonstração de habilidades em desenvolvimento full-stack.
