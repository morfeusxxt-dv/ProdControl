import axios from 'axios';

// Debug API para testar conexão
const API_BASE_URL = 'https://prodcontrol-backend-alt.onrender.com/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    withCredentials: false,
    timeout: 30000, // Aumentado para 30 segundos
});

// Função para testar conexão com retry
export const testConnection = async () => {
    try {
        console.log('🔍 Testando conexão com:', API_BASE_URL);
        const response = await api.get('/test', {
            timeout: 10000, // Timeout menor para teste rápido
        });
        console.log('✅ Resposta do backend:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Erro na conexão:', (error as Error).message);
        
        // Tentar novamente após 2 segundos
        setTimeout(() => {
            console.log('🔄 Tentando novamente...');
            testConnection();
        }, 2000);
        
        throw error;
    }
};

export default api;
