import { useState, useEffect } from 'react';
import api from '../services/api-fixed';

interface ProductionOrder {
    id: number;
    product: {
        id: number;
        name: string;
    };
    quantity: number;
    status: string;
    createdAt: string;
}

const Orders: React.FC = () => {
    const [orders, setOrders] = useState<ProductionOrder[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await api.get('/orders');
            setOrders(data);
            setError('');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const createOrder = async () => {
        try {
            setLoading(true);
            const newOrder = {
                productId: 1, // ID do primeiro produto
                quantity: 10
            };
            await api.post('/orders', newOrder);
            fetchOrders();
            setError('');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return 'text-yellow-600';
            case 'IN_PROGRESS': return 'text-blue-600';
            case 'COMPLETED': return 'text-green-600';
            case 'CANCELLED': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-2xl font-bold mb-6">📋 Ordens de Produção</h1>
                    
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <div className="mb-6">
                        <button
                            onClick={createOrder}
                            disabled={loading}
                            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 disabled:opacity-50"
                        >
                            {loading ? '💾 Criando...' : '➕ Nova Ordem'}
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2 text-left">ID</th>
                                    <th className="border px-4 py-2 text-left">Produto</th>
                                    <th className="border px-4 py-2 text-left">Quantidade</th>
                                    <th className="border px-4 py-2 text-left">Status</th>
                                    <th className="border px-4 py-2 text-left">Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        <td className="border px-4 py-2">{order.id}</td>
                                        <td className="border px-4 py-2">{order.product.name}</td>
                                        <td className="border px-4 py-2">{order.quantity}</td>
                                        <td className={`border px-4 py-2 font-semibold ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;
