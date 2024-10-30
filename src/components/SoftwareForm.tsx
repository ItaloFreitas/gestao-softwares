import React from 'react';
import { Software } from '../types';
import { X } from 'lucide-react';

interface Props {
  software?: Software;
  onSubmit: (data: Omit<Software, 'id'>) => void;
  onClose: () => void;
}

export default function SoftwareForm({ software, onSubmit, onClose }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      name: formData.get('name') as string,
      url: formData.get('url') as string,
      analysisDate: formData.get('analysisDate') as string,
      status: formData.get('status') as 'Homologado' | 'Não Homologado',
      rejectionReason: formData.get('rejectionReason') as string,
      analystName: formData.get('analystName') as string,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            {software ? 'Editar Software' : 'Adicionar Novo Software'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              name="name"
              required
              defaultValue={software?.name}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">URL do Site</label>
            <input
              type="url"
              name="url"
              required
              defaultValue={software?.url}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Data da Análise</label>
            <input
              type="date"
              name="analysisDate"
              required
              defaultValue={software?.analysisDate}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              required
              defaultValue={software?.status}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="Homologado">Homologado</option>
              <option value="Não Homologado">Não Homologado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Motivo da Não Homologação</label>
            <textarea
              name="rejectionReason"
              defaultValue={software?.rejectionReason}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Nome do Analista</label>
            <input
              type="text"
              name="analystName"
              required
              defaultValue={software?.analystName}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {software ? 'Atualizar' : 'Adicionar'} Software
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}