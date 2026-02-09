# 🚀 Deploy Instructions - ProdControl

## ✅ Configuração Completa

Seu projeto já está configurado com suas credenciais reais:

### 🗄️ **Database PostgreSQL**
```
Host: dpg-d64tbi1r0fns73cimatg-a.oregon-postgres.render.com:5432
Database: prodcontrol_db
User: prodcontrol_db_user
Password: c9ZBAc05hS7TiDGbtIgnEPpu7xGo1QW7
```

### 🌐 **URLs Finais**
- Backend: `https://prodcontrol-backend.onrender.com`
- Frontend: `https://seu-projeto.vercel.app`

---

## 📋 **Passo 1: Backend no Render.com**

### 1. Criar Web Service
1. Acesse [render.com](https://render.com)
2. **New Web Service** → **Connect GitHub**
3. Selecione repositório `ProdControl`

### 2. Configuração
```
Name: prodcontrol-backend
Root Directory: prodcontrol-backend
Runtime: Java
Build Command: ./apache-maven-3.9.6/bin/mvn clean package -DskipTests
Start Command: java -jar target/prodcontrol-backend-0.0.1-SNAPSHOT.jar
```

### 3. Variáveis de Ambiente
Adicione estas variáveis:
```
SPRING_PROFILES_ACTIVE = production
```

**Importante**: As credenciais do banco já estão no `application-prod.properties`

### 4. Deploy
- Clique em **"Create Web Service"**
- Aguarde o build (demora ~5 minutos)
- URL será: `https://prodcontrol-backend.onrender.com`

---

## 📋 **Passo 2: Frontend no Vercel**

### 1. Criar Projeto
1. Acesse [vercel.com](https://vercel.com)
2. **Add New Project** → **Import Git Repository**
3. Selecione `ProdControl`

### 2. Configuração
```
Root Directory: prodcontrol-frontend
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

### 3. Variáveis de Ambiente
Adicione:
```
VITE_API_BASE_URL = https://prodcontrol-backend.onrender.com/api
```

### 4. Deploy
- Clique em **"Deploy"**
- URL será: `https://seu-projeto.vercel.app`

---

## 🧪 **Testes Pós-Deploy**

### Backend Test
```bash
curl https://prodcontrol-backend.onrender.com/actuator/health
```
Resposta esperada: `{"status":"UP"}`

### Frontend Test
1. Acesse sua URL do Vercel
2. Tente criar um material
3. Verifique se aparece na lista

---

## 🔧 **Arquivos Configurados**

✅ `application-prod.properties` - Com suas credenciais PostgreSQL
✅ `vercel.json` - Com URL do backend configurada  
✅ `.env.production` - Com variável de ambiente
✅ `render.yaml` - Configuração automática do Render

---

## 🚨 **Troubleshooting**

### Se o Backend não iniciar:
1. Verifique logs no Render.com
2. Confirme se `SPRING_PROFILES_ACTIVE=production`
3. Verifique conexão com PostgreSQL

### Se o Frontend não conectar:
1. Confira `VITE_API_BASE_URL` no Vercel
2. Teste backend diretamente no browser
3. Verifique CORS configuration

### Se PostgreSQL falhar:
1. Confira se database está ativo no Render
2. Teste conexão com psql
3. Verifique credenciais no application-prod.properties

---

## 🎯 **Resultado Final**

Após seguir estes passos você terá:
- ✅ Backend funcionando no Render.com
- ✅ Frontend funcionando no Vercel  
- ✅ Conexão API funcionando
- ✅ Sistema pronto para demonstração!

**Parabéns! Seu sistema está pronto para a vaga! 🚀**
