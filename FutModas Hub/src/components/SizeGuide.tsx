import { Dialog } from '@headlessui/react';
import { Ruler, X } from 'lucide-react';
import { useState } from 'react';

interface SizeGuideProps {
  open: boolean;
  onClose: () => void;
}

export default function SizeGuide({ open, onClose }: SizeGuideProps) {
  const [activeTab, setActiveTab] = useState<'masculino' | 'feminino' | 'infantil'>('masculino');
  
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-gray-900 rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Ruler className="h-5 w-5 text-blue-400" />
              <Dialog.Title className="text-xl font-semibold">
                Guia de Tamanhos
              </Dialog.Title>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-6">
            <div className="flex border-b border-gray-700">
              <button 
                className={`px-4 py-2 font-medium ${activeTab === 'masculino' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
                onClick={() => setActiveTab('masculino')}
              >
                Masculino
              </button>
              <button 
                className={`px-4 py-2 font-medium ${activeTab === 'feminino' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
                onClick={() => setActiveTab('feminino')}
              >
                Feminino
              </button>
              <button 
                className={`px-4 py-2 font-medium ${activeTab === 'infantil' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
                onClick={() => setActiveTab('infantil')}
              >
                Infantil
              </button>
            </div>
          </div>

          {activeTab === 'masculino' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="p-3 text-left">Tamanho</th>
                    <th className="p-3 text-left">Tórax (cm)</th>
                    <th className="p-3 text-left">Cintura (cm)</th>
                    <th className="p-3 text-left">Quadril (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-700">
                    <td className="p-3 font-medium">PP</td>
                    <td className="p-3">88-92</td>
                    <td className="p-3">72-76</td>
                    <td className="p-3">92-96</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="p-3 font-medium">P</td>
                    <td className="p-3">92-96</td>
                    <td className="p-3">76-80</td>
                    <td className="p-3">96-100</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="p-3 font-medium">M</td>
                    <td className="p-3">96-100</td>
                    <td className="p-3">80-84</td>
                    <td className="p-3">100-104</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="p-3 font-medium">G</td>
                    <td className="p-3">100-104</td>
                    <td className="p-3">84-88</td>
                    <td className="p-3">104-108</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="p-3 font-medium">GG</td>
                    <td className="p-3">104-108</td>
                    <td className="p-3">88-92</td>
                    <td className="p-3">108-112</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="p-3 font-medium">XGG</td>
                    <td className="p-3">108-112</td>
                    <td className="p-3">92-96</td>
                    <td className="p-3">112-116</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'feminino' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="p-3 text-left">Tamanho</th>
                    <th className="p-3 text-left">Tórax (cm)</th>
                    <th className="p-3 text-left">Cintura (cm)</th>
                    <th className="p-3 text-left">Quadril (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-700">
                    <td className="p-3 font-medium">PP</td>
                    <td className="p-3">82-86</td>
                    <td className="p-3">66-70</td>
                    <td className="p-3">90-94</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="p-3 font-medium">P</td>
                    <td className="p-3">86-90</td>
                    <td className="p-3">70-74</td>
                    <td className="p-3">94-98</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="p-3 font-medium">M</td>
                    <td className="p-3">90-94</td>
                    <td className="p-3">74-78</td>
                    <td className="p-3">98-102</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="p-3 font-medium">G</td>
                    <td className="p-3">94-98</td>
                    <td className="p-3">78-82</td>
                    <td className="p-3">102-106</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="p-3 font-medium">GG</td>
                    <td className="p-3">98-102</td>
                    <td className="p-3">82-86</td>
                    <td className="p-3">106-110</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'infantil' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="p-3 text-left">Tamanho</th>
                    <th className="p-3 text-left">Idade</th>
                    <th className="p-3 text-left">Altura (cm)</th>
                    <th className="p-3 text-left">Tórax (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-700">
                    <td className="p-3 font-medium">2</td>
                    <td className="p-3">2 anos</td>
                    <td className="p-3">86-92</td>
                    <td className="p-3">52-54</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="p-3 font-medium">4</td>
                    <td className="p-3">4 anos</td>
                    <td className="p-3">92-98</td>
                    <td className="p-3">54-56</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="p-3 font-medium">6</td>
                    <td className="p-3">6 anos</td>
                    <td className="p-3">104-110</td>
                    <td className="p-3">56-58</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="p-3 font-medium">8</td>
                    <td className="p-3">8 anos</td>
                    <td className="p-3">116-122</td>
                    <td className="p-3">60-62</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="p-3 font-medium">10</td>
                    <td className="p-3">10 anos</td>
                    <td className="p-3">128-134</td>
                    <td className="p-3">64-66</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="p-3 font-medium">12</td>
                    <td className="p-3">12 anos</td>
                    <td className="p-3">140-146</td>
                    <td className="p-3">68-70</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="p-3 font-medium">14</td>
                    <td className="p-3">14 anos</td>
                    <td className="p-3">152-158</td>
                    <td className="p-3">72-74</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 bg-blue-500/10 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Como medir?</h3>
            <ul className="text-sm space-y-2 text-gray-300">
              <li><strong>Tórax:</strong> Meça a parte mais larga do tórax, passando a fita métrica sob os braços.</li>
              <li><strong>Cintura:</strong> Meça a parte mais estreita da cintura, geralmente na altura do umbigo.</li>
              <li><strong>Quadril:</strong> Meça a parte mais larga do quadril.</li>
              <li><strong>Altura:</strong> Meça da cabeça até os pés, com a pessoa em pé e descalça.</li>
            </ul>
          </div>

          <div className="mt-6 text-sm text-gray-400">
            <p>Este guia de tamanhos é apenas uma referência. As medidas podem variar dependendo do modelo e fabricante.</p>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
