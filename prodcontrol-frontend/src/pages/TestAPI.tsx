import React, { useState, useEffect } from 'react';
import { testConnection } from '../services/api-debug';

function TestAPI() {
    const [status, setStatus] = useState('Testando...');
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        const test = async () => {
            try {
                const result = await testConnection();
                setStatus('✅ Conectado!');
                setLogs(prev => [...prev, `✅ Backend respondeu: ${JSON.stringify(result)}`]);
            } catch (error: any) {
                setStatus('❌ Erro de conexão');
                setLogs(prev => [...prev, `❌ Erro: ${error.message}`]);
            }
        };

        test();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-2xl font-bold mb-4">🔍 Teste de API</h1>
                    
                    <div className="mb-4">
                        <span className={`text-lg font-semibold ${
                            status.includes('✅') ? 'text-green-600' : 'text-red-600'
                        }`}>
                            Status: {status}
                        </span>
                    </div>

                    <div className="bg-gray-100 rounded p-4">
                        <h2 className="text-lg font-semibold mb-2">📋 Logs:</h2>
                        <div className="space-y-2 font-mono text-sm">
                            {logs.map((log, index) => (
                                <div key={index} className="border-l-4 border-gray-300 pl-4">
                                    {log}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 text-center">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                        >
                            🏠 Voltar ao Sistema
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestAPI;
