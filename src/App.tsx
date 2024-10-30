import React, { useState, useMemo } from 'react';
import { Software, SortField, SortDirection } from './types';
import SoftwareTable from './components/SoftwareTable';
import SoftwareForm from './components/SoftwareForm';
import { Plus, Search } from 'lucide-react';

function App() {
  const [software, setSoftware] = useState<Software[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSoftware, setEditingSoftware] = useState<Software | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedSoftware = useMemo(() => {
    return [...software]
      .filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        const modifier = sortDirection === 'asc' ? 1 : -1;
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.localeCompare(bValue) * modifier;
        }
        return 0;
      });
  }, [software, searchTerm, sortField, sortDirection]);

  const handleSubmit = (data: Omit<Software, 'id'>) => {
    if (editingSoftware) {
      setSoftware(software.map(item =>
        item.id === editingSoftware.id ? { ...data, id: item.id } : item
      ));
    } else {
      setSoftware([...software, { ...data, id: crypto.randomUUID() }]);
    }
    setShowForm(false);
    setEditingSoftware(undefined);
  };

  const handleEdit = (software: Software) => {
    setEditingSoftware(software);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sistema de Gestão de Software</h1>
          <p className="text-gray-600">Gerencie e acompanhe o status de homologação dos softwares</p>
        </div>

        <div className="mb-6 flex justify-between items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar software..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Adicionar Software
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <SoftwareTable
            software={filteredAndSortedSoftware}
            onEdit={handleEdit}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
        </div>

        {showForm && (
          <SoftwareForm
            software={editingSoftware}
            onSubmit={handleSubmit}
            onClose={() => {
              setShowForm(false);
              setEditingSoftware(undefined);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;