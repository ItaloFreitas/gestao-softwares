import React from 'react';
import { Software, SortField, SortDirection } from '../types';
import { ArrowUpDown } from 'lucide-react';

interface Props {
  software: Software[];
  onEdit: (software: Software) => void;
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

export default function SoftwareTable({ software, onEdit, sortField, sortDirection, onSort }: Props) {
  const SortHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <th
      className="px-4 py-2 text-left cursor-pointer hover:bg-gray-50"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        <ArrowUpDown className={`h-4 w-4 ${sortField === field ? 'opacity-100' : 'opacity-30'}`} />
      </div>
    </th>
  );

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <SortHeader field="name">Nome</SortHeader>
            <SortHeader field="url">Site</SortHeader>
            <SortHeader field="analysisDate">Data da Análise</SortHeader>
            <SortHeader field="status">Status</SortHeader>
            <SortHeader field="analystName">Analista</SortHeader>
            <th className="px-4 py-2 text-left">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {software.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">
                <a href={item.url} target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:text-blue-800">
                  {new URL(item.url).hostname}
                </a>
              </td>
              <td className="px-4 py-2">
                {new Date(item.analysisDate).toLocaleDateString('pt-BR')}
              </td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  item.status === 'Homologado' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {item.status}
                </span>
              </td>
              <td className="px-4 py-2">{item.analystName}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => onEdit(item)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}