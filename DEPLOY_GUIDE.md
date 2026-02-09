# 🚀 Guia de Deploy - ProdControl

## 📋 Checklist Antes do Deploy

### ✅ Backend
- [ ] Maven build funciona localmente
- [ ] PostgreSQL configurado
- [ ] Variáveis de ambiente testadas
- [ ] Health check funcionando

### ✅ Frontend  
- [ ] npm run build funciona
- [ ] Variáveis de ambiente configuradas
- [ ] API URL correta

---

## 🌐 Backend - Render.com

### 1. Setup Inicial
```
1. render.com → New Web Service
2. Connect GitHub → ProdControl
3. Root: prodcontrol-backend
4. Runtime: Java
```

### 2. Build Configuration
```
Build Command: ./apache-maven-3.9.6/bin/mvn clean package -DskipTests
Start Command: java -jar target/prodcontrol-backend-0.0.1-SNAPSHOT.jar
```

### 3. Environment Variables
```
SPRING_PROFILES_ACTIVE=production
DATABASE_URL=jdbc:postgresql://...
DATABASE_USERNAME=...
DATABASE_PASSWORD=...
```

### 4. PostgreSQL Setup
```
1. New → PostgreSQL
2. Copiar Internal Database URL
3. Atualizar variáveis de ambiente
```

---

## 🎨 Frontend - Vercel

### 1. Setup Inicial
```
1. vercel.com → Add New Project
2. Import Git Repository
3. Root Directory: prodcontrol-frontend
4. Framework: Vite
```

### 2. Build Settings
```
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 3. Environment Variables
```
VITE_API_BASE_URL=https://seu-backend.onrender.com/api
```

---

## 🔗 Conexão Entre Serviços

### 1. Após Deploy
1. Copie URL do backend: `https://seu-backend.onrender.com`
2. Teste health check: `https://seu-backend.onrender.com/actuator/health`
3. Configure VITE_API_BASE_URL no Vercel
4. Re-deploy frontend

### 2. CORS Configuration
- Backend já configurado para aceitar requisições
- Frontend usa variável de ambiente dinâmica

---

## 🧪 Testes Pós-Deploy

### Backend Tests
```bash
# Health Check
curl https://seu-backend.onrender.com/actuator/health

# API Test
curl https://seu-backend.onrender.com/api/materials
```

### Frontend Tests
1. Acesse: `https://seu-frontend.vercel.app`
2. Teste criação de materiais
3. Verifique console para erros

---

## 🚨 Troubleshooting

### Backend Issues
- **Build falha**: Verifique Maven command
- **Database error**: Confira variáveis de ambiente
- **CORS error**: Verifique configuração de segurança

### Frontend Issues
- **API error**: Confira VITE_API_BASE_URL
- **Build error**: Verifique dependências
- **404 errors**: Confira rotas no vercel.json

---

## 📞 Suporte

Se precisar ajuda:
1. Verifique logs no Render.com
2. Verifique logs no Vercel
3. Teste localmente primeiro
4. Compare com este guia
