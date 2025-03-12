import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../data/products';
import BannerCarousel from './BannerCarousel';
import FilterBar, { FilterOptions } from './FilterBar';
import { Filter, Search } from 'lucide-react';

// Página inicial do site
export default function Home() {
  // Estado para categoria selecionada
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<FilterOptions | null>(null);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Parâmetros da URL
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || "";
  const urlCategory = searchParams.get('category');

  // Define categoria da URL, se presente
  useEffect(() => {
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    }
  }, [urlCategory]);

  // Efeito para debounce da pesquisa
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Lista de categorias disponíveis
  const categories = [
    "Brasileirão",
    "Premier League",
    "La Liga",
    "Serie A",
    "Bundesliga",
    "Ligue 1",
    "Retrô"
  ];

  // Filtra produtos por categoria, busca e filtros avançados
  const filteredProducts = useMemo(() => {
    let products = selectedCategory
      ? PRODUCTS.filter(product => product.league === selectedCategory)
      : PRODUCTS;

    if (debouncedSearchQuery) {
      products = products.filter(product => 
        product.name.toLowerCase().includes(debouncedSearchQuery) ||
        product.team.toLowerCase().includes(debouncedSearchQuery) ||
        product.type.toLowerCase().includes(debouncedSearchQuery) ||
        product.league.toLowerCase().includes(debouncedSearchQuery)
      );
    }

    // Aplica filtros avançados se existirem
    if (activeFilters) {
      // Filtro de preço
      if (activeFilters.price) {
        products = products.filter(product => {
          const productPrice = product.discountPrice || product.price;
          return productPrice >= activeFilters.price[0] && productPrice <= activeFilters.price[1];
        });
      }

      // Filtro de tamanhos
      if (activeFilters.sizes.length > 0) {
        products = products.filter(product => 
          product.sizes && activeFilters.sizes.some(size => product.sizes?.includes(size))
        );
      }

      // Filtro de tipos
      if (activeFilters.types.length > 0) {
        products = products.filter(product => 
          activeFilters.types.includes(product.type)
        );
      }

      // Filtro de times (equipe)
      if (activeFilters.teams.length > 0) {
        products = products.filter(product => 
          activeFilters.teams.includes(product.team)
        );
      }

      // Filtro de ligas
      if (activeFilters.leagues.length > 0) {
        products = products.filter(product => 
          activeFilters.leagues.includes(product.league)
        );
      }

      // Nota: Filtro de cores não está implementado nos dados do produto
      // Seria necessário adicionar a propriedade "color" aos produtos
    }

    return products;
  }, [selectedCategory, debouncedSearchQuery, activeFilters]);

  const handleFilterChange = (filters: FilterOptions) => {
    setActiveFilters(filters);
  };

  const resetFilters = () => {
    setActiveFilters(null);
  };

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
    
    // Atualiza a URL
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    setSearchParams(params);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Atualiza a URL
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  return (
    <div>
      {/* Carrossel de banners */}
      <BannerCarousel />

      {/* Campo de pesquisa avançada */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Pesquise por nome, time, liga ou tipo..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          <div className="absolute left-3 top-3.5 text-gray-400">
            <Search className="h-5 w-5" />
          </div>
          
          {isSearchFocused && (
            <div className="absolute right-3 top-3.5 text-xs text-gray-400">
              Pressione Enter para pesquisar
            </div>
          )}
        </div>
      </div>

      {/* Filtro de categorias */}
      <div className="mb-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 min-w-max pb-2">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              selectedCategory === null
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Todas as Categorias
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Filtros avançados */}
      <FilterBar onFilterChange={handleFilterChange} onReset={resetFilters} />

      {/* Mensagem quando há filtros ativos */}
      <div className="mb-4 flex items-center gap-2 text-gray-400">
        <Filter className="h-4 w-4" />
        <span className="text-sm">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
        </span>
      </div>

      {/* Mensagem quando não há resultados */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-8 bg-gray-900 rounded-lg my-8">
          <p className="text-gray-400 mb-2">Nenhum produto encontrado.</p>
          <p className="text-gray-500 text-sm">Tente ajustar os filtros ou realizar uma nova pesquisa.</p>
        </div>
      )}

      {/* Grade de produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
