import { ChangeEvent, useRef, useState } from 'react';
import { Camera, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useUserProfile } from '../context/UserProfileContext';
import { toast } from 'react-toastify';

export default function Profile() {
  const { user, logout, updateUserProfile } = useAuth();
  const { profile, updateProfilePicture } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Estado para armazenar os dados editáveis do usuário
  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  // Se não estiver logado, mostra mensagem
  if (!user) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Você precisa estar logado</h2>
        <p className="text-gray-400 mb-4">Faça login para acessar seu perfil</p>
      </div>
    );
  }

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Apenas permite imagens
    if (!file.type.match('image.*')) {
      toast.error('Por favor, selecione uma imagem válida');
      return;
    }

    // Converte imagem para base64
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        updateProfilePicture(event.target.result);
        toast.success('Foto de perfil atualizada com sucesso!');
      }
    };
    reader.readAsDataURL(file);
  };

  // Função para lidar com mudanças nos campos do formulário
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Função para salvar as alterações
  const handleSaveChanges = () => {
    // Verifica se há alterações para salvar
    if (userData.name !== user.name || userData.email !== user.email) {
      updateUserProfile({
        name: userData.name,
        email: userData.email
      });
      toast.success('Perfil atualizado com sucesso!');
    }
    
    setIsEditing(false);
  };

  // Função para cancelar as alterações
  const handleCancelEdit = () => {
    // Restaura os dados originais
    setUserData({
      name: user.name,
      email: user.email
    });
    setIsEditing(false);
  };

  // Função para iniciar edição
  const startEditing = () => {
    // Garante que os dados iniciais sejam os atuais
    setUserData({
      name: user.name,
      email: user.email
    });
    setIsEditing(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Meu Perfil</h1>

      <div className="bg-gray-900 rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div 
            className="relative group w-32 h-32 rounded-full overflow-hidden bg-gray-800 cursor-pointer"
            onClick={handleImageClick}
          >
            {profile?.profilePicture ? (
              <img 
                src={profile.profilePicture} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="h-16 w-16 text-gray-500" />
              </div>
            )}
            
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="h-8 w-8 text-white" />
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileChange}
            />
          </div>
          
          <div className="flex-1">
            <div className="mb-4">
              <h3 className="text-xl font-bold">{user.name}</h3>
              <p className="text-gray-400">{user.email}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-blue-500/20 rounded-lg px-4 py-3">
                <p className="text-sm text-blue-400">Pontos</p>
                <p className="text-2xl font-bold text-blue-500">{profile?.points || 0}</p>
              </div>
              
              <div className="bg-green-500/20 rounded-lg px-4 py-3">
                <p className="text-sm text-green-400">Descontos Usados</p>
                <p className="text-2xl font-bold text-green-500">{profile?.discountsUsed.length || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Configurações da Conta</h2>
        
        <div className="space-y-6">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome</label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={handleSaveChanges}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Salvar Alterações
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                <div>
                  <p className="text-sm text-gray-400">Nome</p>
                  <p>{user.name}</p>
                </div>
                <button
                  onClick={startEditing}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Editar
                </button>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p>{user.email}</p>
                </div>
              </div>
              
              <div>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Sair da Conta
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
