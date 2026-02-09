import axios, { type AxiosInstance } from 'axios';

// API corrigida com retry e fallback
class APIService {
    private api: AxiosInstance;
    private baseURL = 'https://prodcontrol-backend-alt.onrender.com/api';

    constructor() {
        this.api = axios.create({
            baseURL: this.baseURL,
            timeout: 45000, // 45 segundos
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        // Interceptor para retry automático
        this.api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                
                if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
                    console.log('🔄 Timeout detectado, tentando novamente...');
                    return this.api(originalRequest);
                }
                
                return Promise.reject(error);
            }
        );
    }

    async get(endpoint: string) {
        try {
            console.log(`📡 GET ${this.baseURL}${endpoint}`);
            const response = await this.api.get(endpoint);
            console.log('✅ Resposta:', response.data);
            return response.data;
        } catch (error: any) {
            console.error('❌ Erro GET:', error.message);
            throw this.handleError(error);
        }
    }

    async post(endpoint: string, data: any) {
        try {
            console.log(`📤 POST ${this.baseURL}${endpoint}`, data);
            const response = await this.api.post(endpoint, data);
            console.log('✅ Resposta:', response.data);
            return response.data;
        } catch (error: any) {
            console.error('❌ Erro POST:', error.message);
            throw this.handleError(error);
        }
    }

    async put(endpoint: string, data: any) {
        try {
            console.log(`📝 PUT ${this.baseURL}${endpoint}`, data);
            const response = await this.api.put(endpoint, data);
            console.log('✅ Resposta:', response.data);
            return response.data;
        } catch (error: any) {
            console.error('❌ Erro PUT:', error.message);
            throw this.handleError(error);
        }
    }

    async delete(endpoint: string) {
        try {
            console.log(`🗑️ DELETE ${this.baseURL}${endpoint}`);
            const response = await this.api.delete(endpoint);
            console.log('✅ Resposta:', response.data);
            return response.data;
        } catch (error: any) {
            console.error('❌ Erro DELETE:', error.message);
            throw this.handleError(error);
        }
    }

    private handleError(error: any) {
        if (error.code === 'ECONNABORTED') {
            return new Error('⏱️ Timeout: O servidor demorou para responder. Tente novamente.');
        }
        if (error.code === 'ERR_NETWORK') {
            return new Error('🌐 Erro de rede: Verifique sua conexão ou tente novamente.');
        }
        if (error.response) {
            return new Error(`❌ Erro ${error.response.status}: ${error.response.data?.message || 'Erro do servidor'}`);
        }
        return new Error('❌ Erro desconhecido. Tente novamente.');
    }
}

export default new APIService();
