import { useState, useEffect } from 'react';
import api from '../services/api-fixed';

interface Product {
    id: number;
    name: string;
    description: string;
    unitPrice: string;
    stockQuantity: string;
}

const ProductsFixed: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        unitPrice: '',
        stockQuantity: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await api.get('/products');
            setProducts(data);
            setError('');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await api.post('/products', formData);
            setFormData({ name: '', description: '', unitPrice: '', stockQuantity: '' });
            fetchProducts();
            setError('');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h1 className="text-2xl font-bold mb-6">📦 Produtos (Versão Corrigida)</h1>
                    
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Nome do Produto"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="border rounded px-3 py-2"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Preço Unitário"
                                value={formData.unitPrice}
                                onChange={(e) => setFormData({...formData, unitPrice: e.target.value})}
                                className="border rounded px-3 py-2"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Quantidade em Estoque"
                                value={formData.stockQuantity}
                                onChange={(e) => setFormData({...formData, stockQuantity: e.target.value})}
                                className="border rounded px-3 py-2"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Descrição"
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                className="border rounded px-3 py-2"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                        >
                            {loading ? '💾 Salvando...' : '➕ Adicionar Produto'}
                        </button>
                    </form>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2 text-left">ID</th>
                                    <th className="border px-4 py-2 text-left">Nome</th>
                                    <th className="border px-4 py-2 text-left">Descrição</th>
                                    <th className="border px-4 py-2 text-left">Preço</th>
                                    <th className="border px-4 py-2 text-left">Estoque</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td className="border px-4 py-2">{product.id}</td>
                                        <td className="border px-4 py-2">{product.name}</td>
                                        <td className="border px-4 py-2">{product.description}</td>
                                        <td className="border px-4 py-2">R$ {product.unitPrice}</td>
                                        <td className="border px-4 py-2">{product.stockQuantity}</td>
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

export default ProductsFixed;
