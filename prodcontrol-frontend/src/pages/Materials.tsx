import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import { Plus, Search, Filter } from 'lucide-react';
import { getErrorMessage } from '../services/errorHandler';

interface Material {
    id: string;
    name: string;
    description: string;
    unitCost: string;
    stockQuantity: string;
}

const Materials: React.FC = () => {
    const [materials, setMaterials] = useState<Material[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newMaterial, setNewMaterial] = useState({ name: '', unitCost: 0, stockQuantity: 0, description: '' });
    const [error, setError] = useState<string | null>(null);

    const fetchMaterials = async () => {
        try {
            setError(null);
            const response = await api.get('/materials');
            setMaterials(response.data);
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            setError(errorMessage);
            console.error("Error loading materials", error);
        }
    };

    useEffect(() => {
        const loadMaterials = async () => {
            await fetchMaterials();
        };
        loadMaterials();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setError(null);
            await api.post('/materials', newMaterial);
            setNewMaterial({ name: '', unitCost: 0, stockQuantity: 0, description: '' });
            setShowModal(false);
            fetchMaterials();
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            setError(errorMessage);
            console.error("Error creating material", error);
        }
    };

    return (
        <Layout>
            {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Matérias-Primas</h1>
                    <p className="text-gray-500">Gerencie o estoque de insumos</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus size={20} /> Novo Material
                </button>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar materiais..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                    <Filter size={20} /> Filtros
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">Nome</th>
                            <th className="px-6 py-3">Descrição</th>
                            <th className="px-6 py-3 text-right">Custo Unit.</th>
                            <th className="px-6 py-3 text-right">Estoque</th>
                            <th className="px-6 py-3 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {materials.map(material => (
                            <tr key={material.id} className="hover:bg-gray-50 group">
                                <td className="px-6 py-4 font-medium text-gray-900">{material.name}</td>
                                <td className="px-6 py-4">{material.description || '-'}</td>
                                <td className="px-6 py-4 text-right">R$ {parseFloat(material.unitCost).toFixed(2)}</td>
                                <td className="px-6 py-4 text-right">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${parseFloat(material.stockQuantity) < 100 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                        {material.stockQuantity}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button className="text-blue-600 hover:text-blue-800 opacity-0 group-hover:opacity-100 transition-opacity">Editar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Simplificado */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
                        <h2 className="text-xl font-bold mb-4">Novo Material</h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                                <input type="text" value={newMaterial.name} onChange={e => setNewMaterial({ ...newMaterial, name: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Custo</label>
                                <input type="number" step="0.01" value={newMaterial.unitCost} onChange={e => setNewMaterial({ ...newMaterial, unitCost: parseFloat(e.target.value) })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Estoque Inicial</label>
                                <input type="number" value={newMaterial.stockQuantity} onChange={e => setNewMaterial({ ...newMaterial, stockQuantity: parseFloat(e.target.value) })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" required />
                            </div>
                            <div className="flex gap-3 justify-end mt-6">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancelar</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Materials;
