import { useState, useEffect } from 'react';
import { ChevronDown, Filter, Tag, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

interface FilterBarProps {
  onFilterChange: (filters: FilterOptions) => void;
  onReset: () => void;
}

export interface FilterOptions {
  price: [number, number] | null;
  sizes: string[];
  types: string[];
  colors: string[];
  teams: string[];
  leagues: string[];
}

export default function FilterBar({ onFilterChange, onReset }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedLeagues, setSelectedLeagues] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const sizes = ["P", "M", "G", "GG", "XGG", "2GG", "3GG"];
  const types = ["Contemporânea", "Retrô", "Goleiro", "Treino", "Passeio"];
  const colors = ["Branco", "Preto", "Vermelho", "Azul", "Verde", "Amarelo", "Laranja"];
  const leagues = ["Brasileirão", "Premier League", "La Liga", "Serie A", "Bundesliga", "Ligue 1", "Retrô"];
  const teams = [
    "Flamengo", "Corinthians", "São Paulo", "Palmeiras", "Grêmio", 
    "Manchester United", "Liverpool", "Arsenal", "Chelsea", 
    "Barcelona", "Real Madrid", "Juventus", "Milan", "Bayern", "PSG"
  ];

  // Carrega filtros da URL quando o componente monta
  useEffect(() => {
    const urlPriceMin = searchParams.get('price_min');
    const urlPriceMax = searchParams.get('price_max');
    const urlSizes = searchParams.get('sizes')?.split(',') || [];
    const urlTypes = searchParams.get('types')?.split(',') || [];
    const urlColors = searchParams.get('colors')?.split(',') || [];
    const urlTeams = searchParams.get('teams')?.split(',') || [];
    const urlLeagues = searchParams.get('leagues')?.split(',') || [];

    if (urlPriceMin && urlPriceMax) {
      setPriceRange([parseInt(urlPriceMin), parseInt(urlPriceMax)]);
    }
    
    if (urlSizes.length > 0 && urlSizes[0] !== '') setSelectedSizes(urlSizes);
    if (urlTypes.length > 0 && urlTypes[0] !== '') setSelectedTypes(urlTypes);
    if (urlColors.length > 0 && urlColors[0] !== '') setSelectedColors(urlColors);
    if (urlTeams.length > 0 && urlTeams[0] !== '') setSelectedTeams(urlTeams);
    if (urlLeagues.length > 0 && urlLeagues[0] !== '') setSelectedLeagues(urlLeagues);

    // Se há algum filtro na URL, aplicamos automaticamente
    if (urlSizes.length > 0 || urlTypes.length > 0 || urlColors.length > 0 || 
        urlTeams.length > 0 || urlLeagues.length > 0 || 
        urlPriceMin || urlPriceMax) {
      setShowFilters(true);
      applyFilters();
    }
  }, []);

  const handleSizeToggle = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handleTypeToggle = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleColorToggle = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleTeamToggle = (team: string) => {
    if (selectedTeams.includes(team)) {
      setSelectedTeams(selectedTeams.filter(t => t !== team));
    } else {
      setSelectedTeams([...selectedTeams, team]);
    }
  };

  const handleLeagueToggle = (league: string) => {
    if (selectedLeagues.includes(league)) {
      setSelectedLeagues(selectedLeagues.filter(l => l !== league));
    } else {
      setSelectedLeagues([...selectedLeagues, league]);
    }
  };

  const applyFilters = () => {
    // Constrói o novo objeto de filtros
    const filters: FilterOptions = {
      price: priceRange,
      sizes: selectedSizes,
      types: selectedTypes,
      colors: selectedColors,
      teams: selectedTeams,
      leagues: selectedLeagues
    };

    // Atualiza a URL com os filtros selecionados
    const params = new URLSearchParams(searchParams);
    
    if (priceRange[0] > 0) params.set('price_min', priceRange[0].toString());
    else params.delete('price_min');
    
    if (priceRange[1] < 500) params.set('price_max', priceRange[1].toString());
    else params.delete('price_max');
    
    if (selectedSizes.length > 0) params.set('sizes', selectedSizes.join(','));
    else params.delete('sizes');
    
    if (selectedTypes.length > 0) params.set('types', selectedTypes.join(','));
    else params.delete('types');
    
    if (selectedColors.length > 0) params.set('colors', selectedColors.join(','));
    else params.delete('colors');
    
    if (selectedTeams.length > 0) params.set('teams', selectedTeams.join(','));
    else params.delete('teams');
    
    if (selectedLeagues.length > 0) params.set('leagues', selectedLeagues.join(','));
    else params.delete('leagues');
    
    setSearchParams(params);

    // Aplica os filtros
    onFilterChange(filters);
    setShowFilters(true);
  };

  const resetFilters = () => {
    setPriceRange([0, 500]);
    setSelectedSizes([]);
    setSelectedTypes([]);
    setSelectedColors([]);
    setSelectedTeams([]);
    setSelectedLeagues([]);
    
    // Limpa os parâmetros de filtro da URL
    const params = new URLSearchParams(searchParams);
    params.delete('price_min');
    params.delete('price_max');
    params.delete('sizes');
    params.delete('types');
    params.delete('colors');
    params.delete('teams');
    params.delete('leagues');
    setSearchParams(params);
    
    onReset();
    setShowFilters(false);
  };

  // Conta quantos filtros estão ativos
  const activeFiltersCount = 
    selectedSizes.length + 
    selectedTypes.length + 
    selectedColors.length + 
    selectedTeams.length +
    selectedLeagues.length +
    (priceRange[0] > 0 || priceRange[1] < 500 ? 1 : 0);

  const removeFilterTag = (type: string, value: string) => {
    switch (type) {
      case 'size':
        setSelectedSizes(selectedSizes.filter(s => s !== value));
        break;
      case 'type':
        setSelectedTypes(selectedTypes.filter(t => t !== value));
        break;
      case 'color':
        setSelectedColors(selectedColors.filter(c => c !== value));
        break;
      case 'team':
        setSelectedTeams(selectedTeams.filter(t => t !== value));
        break;
      case 'league':
        setSelectedLeagues(selectedLeagues.filter(l => l !== value));
        break;
      case 'price':
        setPriceRange([0, 500]);
        break;
    }
  };

  return (
    <>
      <div className="mb-4 bg-gray-900 rounded-lg">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-blue-400" />
            <span className="font-medium">Filtros Avançados</span>
            {activeFiltersCount > 0 && (
              <span className="text-xs bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="px-4 pb-4 border-t border-gray-800">
            <div className="grid md:grid-cols-3 gap-6 pt-4">
              {/* Filtro de preço */}
              <div>
                <h3 className="font-medium mb-3">Preço</h3>
                <div className="mb-1 flex justify-between text-xs text-gray-400">
                  <span>R$ {priceRange[0]}</span>
                  <span>R$ {priceRange[1]}</span>
                </div>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Tamanho</h3>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => handleSizeToggle(size)}
                        className={`px-3 py-1 rounded-md text-sm ${
                          selectedSizes.includes(size)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Tipo</h3>
                  <div className="flex flex-wrap gap-2">
                    {types.map(type => (
                      <button
                        key={type}
                        onClick={() => handleTypeToggle(type)}
                        className={`px-3 py-1 rounded-md text-sm ${
                          selectedTypes.includes(type)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Cor Predominante</h3>
                  <div className="flex flex-wrap gap-2">
                    {colors.map(color => (
                      <button
                        key={color}
                        onClick={() => handleColorToggle(color)}
                        className={`px-3 py-1 rounded-md text-sm ${
                          selectedColors.includes(color)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium mb-3">Liga</h3>
                    <select
                      className="w-full px-3 py-2 rounded-md bg-gray-800 text-white"
                      onChange={(e) => {
                        if (e.target.value) {
                          if (!selectedLeagues.includes(e.target.value)) {
                            setSelectedLeagues([...selectedLeagues, e.target.value]);
                          }
                        }
                      }}
                      value=""
                    >
                      <option value="">Selecione uma liga</option>
                      {leagues.map(league => (
                        <option key={league} value={league} disabled={selectedLeagues.includes(league)}>
                          {league}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Time</h3>
                    <select
                      className="w-full px-3 py-2 rounded-md bg-gray-800 text-white"
                      onChange={(e) => {
                        if (e.target.value) {
                          if (!selectedTeams.includes(e.target.value)) {
                            setSelectedTeams([...selectedTeams, e.target.value]);
                          }
                        }
                      }}
                      value=""
                    >
                      <option value="">Selecione um time</option>
                      {teams.map(team => (
                        <option key={team} value={team} disabled={selectedTeams.includes(team)}>
                          {team}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Lista de seleções ativas */}
            {activeFiltersCount > 0 && (
              <div className="border-t border-gray-800 mt-6 pt-4">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Tag className="h-4 w-4 text-blue-400" />
                  Filtros selecionados:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSizes.map(size => (
                    <div key={size} className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md text-sm flex items-center gap-1">
                      <span>Tamanho: {size}</span>
                      <button onClick={() => removeFilterTag('size', size)}>
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {selectedTypes.map(type => (
                    <div key={type} className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md text-sm flex items-center gap-1">
                      <span>Tipo: {type}</span>
                      <button onClick={() => removeFilterTag('type', type)}>
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {selectedColors.map(color => (
                    <div key={color} className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md text-sm flex items-center gap-1">
                      <span>Cor: {color}</span>
                      <button onClick={() => removeFilterTag('color', color)}>
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {selectedTeams.map(team => (
                    <div key={team} className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md text-sm flex items-center gap-1">
                      <span>Time: {team}</span>
                      <button onClick={() => removeFilterTag('team', team)}>
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {selectedLeagues.map(league => (
                    <div key={league} className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md text-sm flex items-center gap-1">
                      <span>Liga: {league}</span>
                      <button onClick={() => removeFilterTag('league', league)}>
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {(priceRange[0] > 0 || priceRange[1] < 500) && (
                    <div className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md text-sm flex items-center gap-1">
                      <span>Preço: R${priceRange[0]} - R${priceRange[1]}</span>
                      <button onClick={() => removeFilterTag('price', '')}>
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6 pt-4 border-t border-gray-800">
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
                Limpar filtros
              </button>
              <button
                onClick={applyFilters}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Aplicar filtros
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tags de filtros na visualização principal (fora do modal) */}
      {showFilters && activeFiltersCount > 0 && (
        <div className="mb-6 bg-gray-900/50 p-3 rounded-lg">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-400 mr-2">Filtros ativos:</span>
            {selectedSizes.map(size => (
              <div key={size} className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md text-xs flex items-center gap-1">
                <span>{size}</span>
                <button onClick={() => {
                  setSelectedSizes(selectedSizes.filter(s => s !== size));
                  applyFilters();
                }}>
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {selectedTypes.map(type => (
              <div key={type} className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md text-xs flex items-center gap-1">
                <span>{type}</span>
                <button onClick={() => {
                  setSelectedTypes(selectedTypes.filter(t => t !== type));
                  applyFilters();
                }}>
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {selectedColors.map(color => (
              <div key={color} className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md text-xs flex items-center gap-1">
                <span>{color}</span>
                <button onClick={() => {
                  setSelectedColors(selectedColors.filter(c => c !== color));
                  applyFilters();
                }}>
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {selectedTeams.map(team => (
              <div key={team} className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md text-xs flex items-center gap-1">
                <span>{team}</span>
                <button onClick={() => {
                  setSelectedTeams(selectedTeams.filter(t => t !== team));
                  applyFilters();
                }}>
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {selectedLeagues.map(league => (
              <div key={league} className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md text-xs flex items-center gap-1">
                <span>{league}</span>
                <button onClick={() => {
                  setSelectedLeagues(selectedLeagues.filter(l => l !== league));
                  applyFilters();
                }}>
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {(priceRange[0] > 0 || priceRange[1] < 500) && (
              <div className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md text-xs flex items-center gap-1">
                <span>R${priceRange[0]}-R${priceRange[1]}</span>
                <button onClick={() => {
                  setPriceRange([0, 500]);
                  applyFilters();
                }}>
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            <button
              onClick={resetFilters}
              className="bg-gray-700 text-gray-300 hover:bg-gray-600 text-xs px-2 py-1 rounded-md ml-auto"
            >
              Limpar todos
            </button>
          </div>
        </div>
      )}
    </>
  );
}
