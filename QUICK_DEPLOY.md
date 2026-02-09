# 🚀 Deploy Rápido - Link Online

## 📋 **PASSO 1: Backend (5 minutos)**

1. Acesse: https://render.com
2. Login → **"New +"** → **"Web Service"**
3. **Connect GitHub** → Selecione **ProdControl**
4. Configure:
   - Name: `prodcontrol-backend`
   - Root: `prodcontrol-backend`
   - Runtime: `Java`
   - Build: `./apache-maven-3.9.6/bin/mvn clean package -DskipTests`
   - Start: `java -jar target/prodcontrol-backend-0.0.1-SNAPSHOT.jar`
5. **Environment** → Add: `SPRING_PROFILES_ACTIVE` = `production`
6. **Create Web Service** ✅

**Seu link backend:** https://prodcontrol-backend.onrender.com

---

## 📋 **PASSO 2: Frontend (3 minutos)**

1. Acesse: https://vercel.com
2. Login → **"Add New..."** → **"Project"**
3. **Import Git Repository** → Selecione **ProdControl**
4. Configure:
   - Root: `prodcontrol-frontend`
   - Framework: `Vite`
   - Build: `npm run build`
5. **Environment Variables** → Add: 
   - `VITE_API_BASE_URL` = `https://prodcontrol-backend.onrender.com/api`
6. **Deploy** ✅

**Seu link frontend:** https://seu-projeto.vercel.app

---

## 🎯 **SEU SISTEMA ONLINE**

Após os 2 passos, você terá:

🔗 **Link do Sistema:** https://seu-projeto.vercel.app

Onde você poderá:
- Criar matérias-primas
- Gerenciar produtos  
- Controlar ordens de produção
- Ver dashboard completo

---

## ⚡ **Tempo Total: 10 minutos**

✅ Backend: 5 minutos  
✅ Frontend: 3 minutos  
✅ Sistema online: 2 minutos

**É só seguir os passos e terás seu link! 🚀**
