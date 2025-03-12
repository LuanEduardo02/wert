import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface SignUpFormProps {
  onClose: () => void;
}

export default function SignUpForm({ onClose }: SignUpFormProps) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    cpf: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format CPF: 000.000.000-00
    if (name === 'cpf') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 11) {
        let formatted = cleaned;
        if (cleaned.length > 3) {
          formatted = cleaned.replace(/^(\d{3})/, '$1.');
        }
        if (cleaned.length > 6) {
          formatted = formatted.replace(/^(\d{3})\.(\d{3})/, '$1.$2.');
        }
        if (cleaned.length > 9) {
          formatted = formatted.replace(/^(\d{3})\.(\d{3})\.(\d{3})/, '$1.$2.$3-');
        }
        setFormData({ ...formData, cpf: formatted });
      }
      return;
    }
    
    // Format phone: (00) 00000-0000
    if (name === 'phone') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 11) {
        let formatted = cleaned;
        if (cleaned.length > 0) {
          formatted = '(' + formatted;
        }
        if (cleaned.length > 2) {
          formatted = formatted.replace(/^\((\d{2})/, '($1) ');
        }
        if (cleaned.length > 7) {
          formatted = formatted.replace(/^\((\d{2})\) (\d{5})/, '($1) $2-');
        }
        setFormData({ ...formData, phone: formatted });
      }
      return;
    }
    
    // Format ZIP code: 00000-000
    if (name === 'zipCode') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 8) {
        let formatted = cleaned;
        if (cleaned.length > 5) {
          formatted = formatted.replace(/^(\d{5})/, '$1-');
        }
        setFormData({ ...formData, zipCode: formatted });
      }
      return;
    }
    
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não conferem';
    }
    
    if (formData.cpf && formData.cpf.replace(/\D/g, '').length !== 11) {
      newErrors.cpf = 'CPF inválido';
    }
    
    if (formData.phone && formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Telefone inválido';
    }
    
    if (formData.zipCode && formData.zipCode.replace(/\D/g, '').length !== 8) {
      newErrors.zipCode = 'CEP inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      register(formData);
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nome completo *"
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>
      
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="E-mail *"
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>
      
      <div>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Senha *"
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>
      
      <div>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirmar senha *"
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
      </div>
      
      <div>
        <input
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          placeholder="CPF"
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.cpf && <p className="text-red-500 text-sm mt-1">{errors.cpf}</p>}
      </div>
      
      <div>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Telefone"
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>
      
      <div>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Endereço"
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Cidade"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Estado"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div>
        <input
          type="text"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          placeholder="CEP"
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
      </div>
      
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
      >
        Criar Conta
      </button>
      
      <p className="text-xs text-gray-400 mt-4">
        * Campos obrigatórios
      </p>
    </form>
  );
}
