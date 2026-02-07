import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { ShoppingCart, Package, TrendingUp, AlertTriangle } from 'lucide-react';
import Layout from '../components/Layout';

interface Order {
    id: string;
    product: { name: string };
    quantity: number;
    status: string;
    createdAt: string;
}

const Dashboard: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [stats, setStats] = useState({
        totalOrders: 0,
        pendingOrders: 0,
        lowStockItems: 0,
        revenue: 0
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const ordersRes = await api.get('/orders');
            setOrders(ordersRes.data);

            // Calculate dummy stats for now
            const pending = ordersRes.data.filter((o: Order) => o.status === 'PENDING').length;
            setStats({
                totalOrders: ordersRes.data.length,
                pendingOrders: pending,
                lowStockItems: 3, // Mock
                revenue: 12500.00 // Mock
            });
        } catch (error) {
            console.error(error);
        }
    };

    const StatusBadge = ({ status }: { status: string }) => {
        const styles = {
            PENDING: 'bg-yellow-100 text-yellow-800',
            IN_PROGRESS: 'bg-blue-100 text-blue-800',
            COMPLETED: 'bg-green-100 text-green-800',
            CANCELLED: 'bg-red-100 text-red-800'
        };
        return (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || 'bg-gray-100'}`}>
                {status}
            </span>
        );
    };

    return (
        <Layout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-500">Visão geral da produção</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total de Ordens</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-2">{stats.totalOrders}</h3>
                        </div>
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <ShoppingCart size={20} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Pendentes</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-2">{stats.pendingOrders}</h3>
                        </div>
                        <div className="p-2 bg-yellow-50 rounded-lg text-yellow-600">
                            <AlertTriangle size={20} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Em Produção</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-2">{orders.filter(o => o.status === 'IN_PROGRESS').length}</h3>
                        </div>
                        <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                            <Package size={20} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Receita Estimada</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-2">R$ {stats.revenue.toLocaleString()}</h3>
                        </div>
                        <div className="p-2 bg-green-50 rounded-lg text-green-600">
                            <TrendingUp size={20} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800">Ordens Recentes</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Produto</th>
                                <th className="px-6 py-3">Quantidade</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Data</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-mono text-xs">{order.id.substring(0, 8)}...</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{order.product?.name}</td>
                                    <td className="px-6 py-4">{order.quantity}</td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={order.status} />
                                    </td>
                                    <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                                        Nenhuma ordem encontrada.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
