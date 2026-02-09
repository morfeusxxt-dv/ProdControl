import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import { Plus, Tags } from 'lucide-react';
import { RenderNotification } from '../components/RenderNotification';
import { useRenderNotification } from '../hooks/useRenderNotification';

interface Product {
    id: string;
    name: string;
    description: string;
    unitPrice: string;
    stockQuantity: string;
}

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', unitPrice: 0, stockQuantity: 0 });
    
    const { showNotification, handleApiError, hideNotification } = useRenderNotification();

    const fetchProducts = async () => {
        try {
            const response = await api.get('/products');
            setProducts(response.data);
        } catch (error) {
            handleApiError(error);
            console.error("Error loading products", error);
        }
    };

    useEffect(() => {
        const loadProducts = async () => {
            await fetchProducts();
        };
        loadProducts();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/products', newProduct);
            setNewProduct({ name: '', unitPrice: 0, stockQuantity: 0 });
            setShowModal(false);
            fetchProducts();
        } catch (error) {
            handleApiError(error);
            console.error("Error creating product", error);
        }
    };

    return (
        <Layout>
            <RenderNotification isVisible={showNotification} onClose={hideNotification} />
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Produtos</h1>
                    <p className="text-gray-500">Catálogo de produtos acabados</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    <Plus size={20} /> Novo Produto
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <div key={product.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <Tags size={24} />
                            </div>
                            <span className="text-lg font-bold text-gray-900">R$ {parseFloat(product.unitPrice).toFixed(2)}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description || 'Sem descrição definida.'}</p>

                        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                            <span className="text-sm text-gray-500">Estoque: <strong className="text-gray-900">{product.stockQuantity}</strong></span>
                            <button className="text-sm text-indigo-600 font-medium hover:underline">Ver Detalhes</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
                        <h2 className="text-xl font-bold mb-4">Novo Produto</h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                                <input type="text" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Preço Venda</label>
                                <input type="number" step="0.01" value={newProduct.unitPrice} onChange={e => setNewProduct({ ...newProduct, unitPrice: parseFloat(e.target.value) })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Estoque Inicial</label>
                                <input type="number" value={newProduct.stockQuantity} onChange={e => setNewProduct({ ...newProduct, stockQuantity: parseFloat(e.target.value) })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none" required />
                            </div>
                            <div className="flex gap-3 justify-end mt-6">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancelar</button>
                                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Products;
