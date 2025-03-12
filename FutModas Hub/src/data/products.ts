import { Product } from '../types';

// Shared product database
export const PRODUCTS: Product[] = [
  // Brasileirão Products
  {
    id: 1,
    name: "Camisa Atlético-MG 2023/24",
    team: "Atlético-MG",
    league: "Brasileirão",
    price: 299.99,
    discountPrice: 229.99,
    image: "https://placehold.co/300x300/gray/white?text=Atletico-MG",
    description: "Camisa oficial do Atlético Mineiro para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Ótima qualidade!", author: "João Pedro" }
    ]
  },
  {
    id: 2,
    name: "Camisa Bahia 2023/24",
    team: "Bahia",
    league: "Brasileirão",
    price: 299.99,
    image: "https://placehold.co/300x300/gray/white?text=Bahia",
    description: "Camisa oficial do Bahia para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Excelente!", author: "Carlos Silva" }
    ]
  },
  {
    id: 3,
    name: "Camisa Botafogo 2023/24",
    team: "Botafogo",
    league: "Brasileirão",
    price: 299.99,
    discountPrice: 259.99,
    image: "https://placehold.co/300x300/gray/white?text=Botafogo",
    description: "Camisa oficial do Botafogo para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 5, comment: "Muito boa!", author: "Rafael Costa" }
    ]
  },
  {
    id: 4,
    name: "Camisa Ceará SC 2023/24",
    team: "Ceará SC",
    league: "Brasileirão",
    price: 299.99,
    image: "https://placehold.co/300x300/gray/white?text=Ceara",
    description: "Camisa oficial do Ceará para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Ótimo produto!", author: "Pedro Santos" }
    ]
  },
  {
    id: 5,
    name: "Camisa Corinthians 2023/24",
    team: "Corinthians",
    league: "Brasileirão",
    price: 299.99,
    discountPrice: 239.99,
    image: "https://placehold.co/300x300/gray/white?text=Corinthians",
    description: "Camisa oficial do Corinthians para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 5, comment: "Perfeita!", author: "Marcos Paulo" }
    ]
  },
  {
    id: 6,
    name: "Camisa Cruzeiro 2023/24",
    team: "Cruzeiro",
    league: "Brasileirão",
    price: 299.99,
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…IgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIP//Z",
    description: "Camisa oficial do Cruzeiro para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Muito boa!", author: "Lucas Silva" }
    ]
  },
  {
    id: 7,
    name: "Camisa Flamengo 2023/24",
    team: "Flamengo",
    league: "Brasileirão",
    price: 299.99,
    discountPrice: 239.99,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT94LMybWZ4uta91YCEDgs3JFH5abc8UeOgLwbCWWVSvg&s",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT94LMybWZ4uta91YCEDgs3JFH5abc8UeOgLwbCWWVSvg&s",
      "https://lojadofla.vteximg.com.br/arquivos/ids/168736-1000-1000/1HJFE7621_2.jpg",
      "https://lojadofla.vteximg.com.br/arquivos/ids/168738-1000-1000/1HJFE7621_3.jpg",
      "https://lojadofla.vteximg.com.br/arquivos/ids/168744-1000-1000/1HJFE7621_7.jpg",
      "https://lojadofla.vteximg.com.br/arquivos/ids/168739-1000-1000/1HJFE7621_5.jpg"
    ],
    description: "Camisa oficial do Flamengo para a temporada 2023/24. Material de alta qualidade com tecnologia de absorção de suor. Escudo do clube bordado no peito.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 5, comment: "Simplesmente perfeita!", author: "Ricardo Santos" }
    ]
  },
  {
    id: 8,
    name: "Camisa Fluminense 2023/24",
    team: "Fluminense",
    league: "Brasileirão",
    price: 299.99,
    discountPrice: 249.99,
    image: "https://placehold.co/300x300/gray/white?text=Fluminense",
    description: "Camisa oficial do Fluminense para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 5, comment: "Excelente qualidade!", author: "Fernando Souza" }
    ]
  },
  {
    id: 9,
    name: "Camisa Fortaleza 2023/24",
    team: "Fortaleza",
    league: "Brasileirão",
    price: 299.99,
    image: "https://placehold.co/300x300/gray/white?text=Fortaleza",
    description: "Camisa oficial do Fortaleza para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Ótimo produto!", author: "Ricardo Lima" }
    ]
  },
  {
    id: 10,
    name: "Camisa Grêmio 2023/24",
    team: "Grêmio",
    league: "Brasileirão",
    price: 299.99,
    discountPrice: 259.99,
    image: "https://placehold.co/300x300/gray/white?text=Gremio",
    description: "Camisa oficial do Grêmio para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 5, comment: "Perfeita!", author: "André Santos" }
    ]
  },
  // Premier League Products
  {
    id: 11,
    name: "Camisa Arsenal 2023/24",
    team: "Arsenal",
    league: "Premier League",
    price: 349.99,
    discountPrice: 299.99,
    image: "https://placehold.co/300x300/gray/white?text=Arsenal",
    description: "Camisa oficial do Arsenal para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 5, comment: "Excelente qualidade!", author: "James Wilson" }
    ]
  },
  {
    id: 12,
    name: "Camisa Manchester City 2023/24",
    team: "Manchester City",
    league: "Premier League",
    price: 349.99,
    discountPrice: 299.99,
    image: "https://placehold.co/300x300/gray/white?text=ManCity",
    description: "Camisa oficial do Manchester City para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 5, comment: "Ótima qualidade!", author: "João Silva" }
    ]
  },
  {
    id: 13,
    name: "Camisa Liverpool 2023/24",
    team: "Liverpool",
    league: "Premier League",
    price: 349.99,
    discountPrice: 289.99,
    image: "https://placehold.co/300x300/gray/white?text=Liverpool",
    description: "Camisa oficial do Liverpool para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 5, comment: "Qualidade superior!", author: "Thomas Brown" }
    ]
  },
  {
    id: 14,
    name: "Camisa Manchester United 2023/24",
    team: "Manchester United",
    league: "Premier League",
    price: 349.99,
    image: "https://placehold.co/300x300/gray/white?text=ManUnited",
    description: "Camisa oficial do Manchester United para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Muito boa!", author: "David Jones" }
    ]
  },
  {
    id: 15,
    name: "Camisa Chelsea 2023/24",
    team: "Chelsea",
    league: "Premier League",
    price: 349.99,
    discountPrice: 289.99,
    image: "https://placehold.co/300x300/gray/white?text=Chelsea",
    description: "Camisa oficial do Chelsea para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 5, comment: "Excelente!", author: "Michael Smith" }
    ]
  },
  {
    id: 16,
    name: "Camisa Tottenham 2023/24",
    team: "Tottenham",
    league: "Premier League",
    price: 349.99,
    image: "https://placehold.co/300x300/gray/white?text=Tottenham",
    description: "Camisa oficial do Tottenham para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Muito boa qualidade!", author: "William Davis" }
    ]
  },
  {
    id: 17,
    name: "Camisa Newcastle 2023/24",
    team: "Newcastle",
    league: "Premier League",
    price: 349.99,
    image: "https://placehold.co/300x300/gray/white?text=Newcastle",
    description: "Camisa oficial do Newcastle para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Ótimo produto!", author: "Oliver White" }
    ]
  },
  {
    id: 18,
    name: "Camisa West Ham 2023/24",
    team: "West Ham",
    league: "Premier League",
    price: 329.99,
    discountPrice: 279.99,
    image: "https://placehold.co/300x300/gray/white?text=WestHam",
    description: "Camisa oficial do West Ham para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Muito boa!", author: "Harry Johnson" }
    ]
  },
  {
    id: 19,
    name: "Camisa Aston Villa 2023/24",
    team: "Aston Villa",
    league: "Premier League",
    price: 329.99,
    image: "https://placehold.co/300x300/gray/white?text=AstonVilla",
    description: "Camisa oficial do Aston Villa para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Excelente qualidade!", author: "George Brown" }
    ]
  },
  {
    id: 20,
    name: "Camisa Brighton 2023/24",
    team: "Brighton",
    league: "Premier League",
    price: 329.99,
    discountPrice: 279.99,
    image: "https://placehold.co/300x300/gray/white?text=Brighton",
    description: "Camisa oficial do Brighton para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Recomendo!", author: "Jack Wilson" }
    ]
  },
  // La Liga Products
  {
    id: 21,
    name: "Camisa Real Madrid 2023/24",
    team: "Real Madrid",
    league: "La Liga",
    price: 349.99,
    discountPrice: 279.99,
    image: "https://placehold.co/300x300/gray/white?text=RealMadrid",
    description: "Camisa oficial do Real Madrid para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 5, comment: "Excelente qualidade!", author: "Carlos Mendes" }
    ]
  },
  {
    id: 22,
    name: "Camisa Barcelona 2023/24",
    team: "Barcelona",
    league: "La Liga",
    price: 349.99,
    image: "https://placehold.co/300x300/gray/white?text=Barcelona",
    description: "Camisa oficial do Barcelona para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Ótimo produto!", author: "Ana Silva" }
    ]
  },
  {
    id: 23,
    name: "Camisa Atlético de Madrid 2023/24",
    team: "Atlético de Madrid",
    league: "La Liga",
    price: 349.99,
    discountPrice: 299.99,
    image: "https://placehold.co/300x300/gray/white?text=AtleticoMadrid",
    description: "Camisa oficial do Atlético de Madrid para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 5, comment: "Excelente qualidade!", author: "Miguel Torres" }
    ]
  },
  {
    id: 24,
    name: "Camisa Sevilla 2023/24",
    team: "Sevilla",
    league: "La Liga",
    price: 329.99,
    image: "https://placehold.co/300x300/gray/white?text=Sevilla",
    description: "Camisa oficial do Sevilla para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Muito boa!", author: "Eduardo García" }
    ]
  },
  {
    id: 25,
    name: "Camisa Valencia 2023/24",
    team: "Valencia",
    league: "La Liga",
    price: 329.99,
    discountPrice: 279.99,
    image: "https://placehold.co/300x300/gray/white?text=Valencia",
    description: "Camisa oficial do Valencia para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Ótima qualidade!", author: "Javier Martínez" }
    ]
  },
  {
    id: 26,
    name: "Camisa Athletic Bilbao 2023/24",
    team: "Athletic Bilbao",
    league: "La Liga",
    price: 329.99,
    image: "https://placehold.co/300x300/gray/white?text=AthleticBilbao",
    description: "Camisa oficial do Athletic Bilbao para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Excelente!", author: "Jon Etxeberria" }
    ]
  },
  {
    id: 27,
    name: "Camisa Real Sociedad 2023/24",
    team: "Real Sociedad",
    league: "La Liga",
    price: 329.99,
    discountPrice: 279.99,
    image: "https://placehold.co/300x300/gray/white?text=RealSociedad",
    description: "Camisa oficial do Real Sociedad para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Muito boa!", author: "Mikel González" }
    ]
  },
  {
    id: 28,
    name: "Camisa Villarreal 2023/24",
    team: "Villarreal",
    league: "La Liga",
    price: 329.99,
    image: "https://placehold.co/300x300/gray/white?text=Villarreal",
    description: "Camisa oficial do Villarreal para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Ótimo produto!", author: "Sergio López" }
    ]
  },
  {
    id: 29,
    name: "Camisa Real Betis 2023/24",
    team: "Real Betis",
    league: "La Liga",
    price: 329.99,
    discountPrice: 279.99,
    image: "https://placehold.co/300x300/gray/white?text=RealBetis",
    description: "Camisa oficial do Real Betis para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Excelente qualidade!", author: "Antonio Sánchez" }
    ]
  },
  {
    id: 30,
    name: "Camisa Celta de Vigo 2023/24",
    team: "Celta de Vigo",
    league: "La Liga",
    price: 329.99,
    image: "https://placehold.co/300x300/gray/white?text=CeltaVigo",
    description: "Camisa oficial do Celta de Vigo para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Muito boa!", author: "Carlos Rodríguez" }
    ]
  },
  // Serie A Products
  {
    id: 31,
    name: "Camisa Inter 2023/24",
    team: "Inter de Milão",
    league: "Serie A",
    price: 349.99,
    discountPrice: 289.99,
    image: "https://placehold.co/300x300/gray/white?text=Inter",
    description: "Camisa oficial da Inter de Milão para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 5, comment: "Excelente!", author: "Mario Rossi" }
    ]
  },
  {
    id: 32,
    name: "Camisa Milan 2023/24",
    team: "Milan",
    league: "Serie A",
    price: 349.99,
    discountPrice: 289.99,
    image: "https://placehold.co/300x300/gray/white?text=Milan",
    description: "Camisa oficial do Milan para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 5, comment: "Perfeita!", author: "Luigi Bianchi" }
    ]
  },
  {
    id: 33,
    name: "Camisa Juventus 2023/24",
    team: "Juventus",
    league: "Serie A",
    price: 349.99,
    image: "https://placehold.co/300x300/gray/white?text=Juventus",
    description: "Camisa oficial da Juventus para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 5, comment: "Excelente qualidade!", author: "Paolo Verdi" }
    ]
  },
  {
    id: 34,
    name: "Camisa Napoli 2023/24",
    team: "Napoli",
    league: "Serie A",
    price: 329.99,
    discountPrice: 279.99,
    image: "https://placehold.co/300x300/gray/white?text=Napoli",
    description: "Camisa oficial do Napoli para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 5, comment: "Muito boa!", author: "Marco Esposito" }
    ]
  },
  {
    id: 35,
    name: "Camisa Roma 2023/24",
    team: "Roma",
    league: "Serie A",
    price: 329.99,
    image: "https://placehold.co/300x300/gray/white?text=Roma",
    description: "Camisa oficial da Roma para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Ótima qualidade!", author: "Antonio Russo" }
    ]
  },
  {
    id: 36,
    name: "Camisa Lazio 2023/24",
    team: "Lazio",
    league: "Serie A",
    price: 329.99,
    discountPrice: 279.99,
    image: "https://placehold.co/300x300/gray/white?text=Lazio",
    description: "Camisa oficial da Lazio para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Excelente!", author: "Francesco Romano" }
    ]
  },
  {
    id: 37,
    name: "Camisa Atalanta 2023/24",
    team: "Atalanta",
    league: "Serie A",
    price: 329.99,
    image: "https://placehold.co/300x300/gray/white?text=Atalanta",
    description: "Camisa oficial da Atalanta para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Muito boa!", author: "Giuseppe Colombo" }
    ]
  },
  {
    id: 38,
    name: "Camisa Fiorentina 2023/24",
    team: "Fiorentina",
    league: "Serie A",
    price: 329.99,
    discountPrice: 279.99,
    image: "https://placehold.co/300x300/gray/white?text=Fiorentina",
    description: "Camisa oficial da Fiorentina para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Ótimo produto!", author: "Leonardo Ferrari" }
    ]
  },
  {
    id: 39,
    name: "Camisa Torino 2023/24",
    team: "Torino",
    league: "Serie A",
    price: 329.99,
    image: "https://placehold.co/300x300/gray/white?text=Torino",
    description: "Camisa oficial do Torino para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Excelente qualidade!", author: "Roberto Conti" }
    ]
  },
  {
    id: 40,
    name: "Camisa Bologna 2023/24",
    team: "Bologna",
    league: "Serie A",
    price: 329.99,
    discountPrice: 279.99,
    image: "https://placehold.co/300x300/gray/white?text=Bologna",
    description: "Camisa oficial do Bologna para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Muito boa!", author: "Stefano Ricci" }
    ]
  },
  // Bundesliga Products
  {
    id: 41,
    name: "Camisa Bayern de Munique 2023/24",
    team: "Bayern",
    league: "Bundesliga",
    price: 349.99,
    discountPrice: 299.99,
    image: "https://placehold.co/300x300/gray/white?text=Bayern",
    description: "Camisa oficial do Bayern de Munique para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 5, comment: "Excelente qualidade!", author: "Hans Mueller" }
    ]
  },
  {
    id: 42,
    name: "Camisa Borussia Dortmund 2023/24",
    team: "Borussia Dortmund",
    league: "Bundesliga",
    price: 349.99,
    discountPrice: 289.99,
    image: "https://placehold.co/300x300/gray/white?text=Dortmund",
    description: "Camisa oficial do Borussia Dortmund para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 5, comment: "Perfeita!", author: "Thomas Schmidt" }
    ]
  },
  {
    id: 43,
    name: "Camisa RB Leipzig 2023/24",
    team: "RB Leipzig",
    league: "Bundesliga",
    price: 329.99,
    image: "https://placehold.co/300x300/gray/white?text=Leipzig",
    description: "Camisa oficial do RB Leipzig para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Muito boa!", author: "Max Wagner" }
    ]
  },
  {
    id: 44,
    name: "Camisa Bayer Leverkusen 2023/24",
    team: "Bayer Leverkusen",
    league: "Bundesliga",
    price: 329.99,
    discountPrice: 279.99,
    image: "https://placehold.co/300x300/gray/white?text=Leverkusen",
    description: "Camisa oficial do Bayer Leverkusen para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Ótima qualidade!", author: "Felix Schneider" }
    ]
  },
  {
    id: 45,
    name: "Camisa Eintracht Frankfurt 2023/24",
    team: "Eintracht Frankfurt",
    league: "Bundesliga",
    price: 329.99,
    image: "https://placehold.co/300x300/gray/white?text=Frankfurt",
    description: "Camisa oficial do Eintracht Frankfurt para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Excelente!", author: "Jonas Fischer" }
    ]
  },
  {
    id: 46,
    name: "Camisa Borussia Mönchengladbach 2023/24",
    team: "Borussia Mönchengladbach",
    league: "Bundesliga",
    price: 329.99,
    discountPrice: 279.99,
    image: "https://placehold.co/300x300/gray/white?text=Gladbach",
    description: "Camisa oficial do Borussia Mönchengladbach para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Muito boa!", author: "Paul Weber" }
    ]
  },
  {
    id: 47,
    name: "Camisa Wolfsburg 2023/24",
    team: "Wolfsburg",
    league: "Bundesliga",
    price: 329.99,
    image: "https://placehold.co/300x300/gray/white?text=Wolfsburg",
    description: "Camisa oficial do Wolfsburg para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Ótimo produto!", author: "Lukas Hoffmann" }
    ]
  },
  {
    id: 48,
    name: "Camisa Stuttgart 2023/24",
    team: "Stuttgart",
    league: "Bundesliga",
    price: 329.99,
    discountPrice: 279.99,
    image: "https://placehold.co/300x300/gray/white?text=Stuttgart",
    description: "Camisa oficial do Stuttgart para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Excelente qualidade!", author: "Tim Becker" }
    ]
  },
  {
    id: 49,
    name: "Camisa Union Berlin 2023/24",
    team: "Union Berlin",
    league: "Bundesliga",
    price: 329.99,
    image: "https://placehold.co/300x300/gray/white?text=UnionBerlin",
    description: "Camisa oficial do Union Berlin para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Muito boa!", author: "Niklas Meyer" }
    ]
  },
  {
    id: 50,
    name: "Camisa Freiburg 2023/24",
    team: "Freiburg",
    league: "Bundesliga",
    price: 329.99,
    discountPrice: 279.99,
    image: "https://placehold.co/300x300/gray/white?text=Freiburg",
    description: "Camisa oficial do Freiburg para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Ótima camisa!", author: "David Klein" }
    ]
  },
  // Ligue 1 Products
  {
    id: 51,
    name: "Camisa PSG 2023/24",
    team: "PSG",
    league: "Ligue 1",
    price: 349.99,
    discountPrice: 279.99,
    image: "https://placehold.co/300x300/gray/white?text=PSG",
    description: "Camisa oficial do Paris Saint-Germain para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 5, comment: "Perfeita!", author: "Pierre Dubois" }
    ]
  },
  {
    id: 52,
    name: "Camisa Olympique de Marseille 2023/24",
    team: "Marseille",
    league: "Ligue 1",
    price: 329.99,
    discountPrice: 279.99,
    image: "https://placehold.co/300x300/gray/white?text=Marseille",
    description: "Camisa oficial do Olympique de Marseille para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Excelente qualidade!", author: "Jean Martin" }
    ]
  },
  {
    id: 53,
    name: "Camisa Olympique Lyonnais 2023/24",
    team: "Lyon",
    league: "Ligue 1",
    price: 329.99,
    image: "https://placehold.co/300x300/gray/white?text=Lyon",
    description: "Camisa oficial do Olympique Lyonnais para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Muito boa!", author: "Antoine Bernard" }
    ]
  },
  {
    id: 54,
    name: "Camisa Monaco 2023/24",
    team: "Monaco",
    league: "Ligue 1",
    price: 329.99,
    discountPrice: 279.99,
    image: "https://placehold.co/300x300/gray/white?text=Monaco",
    description: "Camisa oficial do Monaco para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Ótimo produto!", author: "Phillipe Moreau" }
    ]
  },
  {
    id: 55,
    name: "Camisa Lille 2023/24",
    team: "Lille",
    league: "Ligue 1",
    price: 329.99,
    image: "https://placehold.co/300x300/gray/white?text=Lille",
    description: "Camisa oficial do Lille para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Excelente!", author: "Lucas Fournier" }
    ]
  },
  {
    id: 56,
    name: "Camisa Rennes 2023/24",
    team: "Rennes",
    league: "Ligue 1",
    price: 329.99,
    discountPrice: 279.99,
    image: "https://placehold.co/300x300/gray/white?text=Rennes",
    description: "Camisa oficial do Rennes para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Muito boa!", author: "Simon Leroy" }
    ]
  },
  {
    id: 57,
    name: "Camisa Nice 2023/24",
    team: "Nice",
    league: "Ligue 1",
    price: 329.99,
    image: "https://placehold.co/300x300/gray/white?text=Nice",
    description: "Camisa oficial do Nice para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Ótima qualidade!", author: "Mathieu Dupont" }
    ]
  },
  {
    id: 58,
    name: "Camisa Lens 2023/24",
    team: "Lens",
    league: "Ligue 1",
    price: 329.99,
    discountPrice: 279.99,
    image: "https://placehold.co/300x300/gray/white?text=Lens",
    description: "Camisa oficial do Lens para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Excelente qualidade!", author: "Thomas Laurent" }
    ]
  },
  {
    id: 59,
    name: "Camisa Nantes 2023/24",
    team: "Nantes",
    league: "Ligue 1",
    price: 329.99,
    image: "https://placehold.co/300x300/gray/white?text=Nantes",
    description: "Camisa oficial do Nantes para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Muito boa!", author: "Paul Rousseau" }
    ]
  },
  {
    id: 60,
    name: "Camisa Strasbourg 2023/24",
    team: "Strasbourg",
    league: "Ligue 1",
    price: 329.99,
    discountPrice: 279.99,
    image: "https://placehold.co/300x300/gray/white?text=Strasbourg",
    description: "Camisa oficial do Strasbourg para a temporada 2023/24.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Poliéster Reciclado",
    type: "Contemporânea",
    reviews: [
      { id: 1, rating: 4, comment: "Ótimo produto!", author: "Julien Petit" }
    ]
  },
  // Retrô Products
  {
    id: 61,
    name: "Camisa Brasil 1970 Retrô",
    team: "Brasil",
    league: "Retrô",
    price: 299.99,
    image: "https://placehold.co/300x300/gray/white?text=Brasil1970",
    description: "Camisa retrô da seleção brasileira campeã mundial de 1970.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Algodão",
    type: "Retrô",
    reviews: [
      { id: 1, rating: 5, comment: "Uma verdadeira relíquia!", author: "Roberto Campos" }
    ]
  },
  {
    id: 62,
    name: "Camisa Argentina 1986 Retrô",
    team: "Argentina",
    league: "Retrô",
    price: 299.99,
    discountPrice: 259.99,
    image: "https://placehold.co/300x300/gray/white?text=Argentina1986",
    description: "Camisa retrô da seleção argentina campeã mundial de 1986.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Algodão",
    type: "Retrô",
    reviews: [
      { id: 1, rating: 5, comment: "Peça histórica!", author: "Pablo Gonzalez" }
    ]
  },
  {
    id: 63,
    name: "Camisa AC Milan 1988/89 Retrô",
    team: "AC Milan",
    league: "Retrô",
    price: 299.99,
    image: "https://placehold.co/300x300/gray/white?text=Milan1988",
    description: "Camisa retrô do AC Milan campeão europeu de 1988/89.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Algodão",
    type: "Retrô",
    reviews: [
      { id: 1, rating: 5, comment: "Qualidade incrível!", author: "Marco Rossi" }
    ]
  },
  {
    id: 64,
    name: "Camisa Ajax 1994/95 Retrô",
    team: "Ajax",
    league: "Retrô",
    price: 299.99,
    discountPrice: 259.99,
    image: "https://placehold.co/300x300/gray/white?text=Ajax1995",
    description: "Camisa retrô do Ajax campeão europeu de 1994/95.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Algodão",
    type: "Retrô",
    reviews: [
      { id: 1, rating: 5, comment: "Design clássico inconfundível!", author: "Jan de Boer" }
    ]
  },
  {
    id: 65,
    name: "Camisa Barcelona 1992 Retrô",
    team: "Barcelona",
    league: "Retrô",
    price: 299.99,
    image: "https://placehold.co/300x300/gray/white?text=Barcelona1992",
    description: "Camisa retrô do Barcelona campeão europeu de 1992.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Algodão",
    type: "Retrô",
    reviews: [
      { id: 1, rating: 5, comment: "Um sonho realizado!", author: "Josep Garcia" }
    ]
  },
  {
    id: 66,
    name: "Camisa Flamengo 1981 Retrô",
    team: "Flamengo",
    league: "Retrô",
    price: 299.99,
    discountPrice: 259.99,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT94LMybWZ4uta91YCEDgs3JFH5abc8UeOgLwbCWWVSvg&s",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT94LMybWZ4uta91YCEDgs3JFH5abc8UeOgLwbCWWVSvg&s",
      "https://assets.wirtualnamoda.pl/uploads/2015/12/adidas-retro-1.jpg",
      "https://st.depositphotos.com/1907633/3251/i/450/depositphotos_32514133-stock-photo-rio-de-janeiro-brazil-december.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPIJRnV-yCL9XaQxuJCIRUMXo66nY1eOh49hBtpk9Z45KKnq-m1d1-2qTnHtUC9oXXSAw&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPLjdCBTj-dQyxkdnJDNQBGD1yEQw48k7IqA&s"
    ],
    description: "Camisa retrô do Flamengo campeão mundial de 1981. Esta réplica traz de volta o design clássico usado pelo time durante sua vitoriosa campanha na Copa Intercontinental, quando venceu o Liverpool por 3 a 0.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Algodão",
    type: "Retrô",
    reviews: [
      { id: 1, rating: 5, comment: "Simplesmente perfeita!", author: "Carlos Eduardo" },
      { id: 2, rating: 5, comment: "Qualidade incrível, tecido confortável!", author: "Ricardo Almeida" },
      { id: 3, rating: 4, comment: "Ótima camisa, só achei um pouco grande.", author: "Paulo Roberto" }
    ]
  },
  {
    id: 67,
    name: "Camisa Inglaterra 1966 Retrô",
    team: "Inglaterra",
    league: "Retrô",
    price: 299.99,
    image: "https://placehold.co/300x300/gray/white?text=Inglaterra1966",
    description: "Camisa retrô da seleção inglesa campeã mundial de 1966.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Algodão",
    type: "Retrô",
    reviews: [
      { id: 1, rating: 5, comment: "Excelente reprodução!", author: "James Wilson" }
    ]
  },
  {
    id: 68,
    name: "Camisa Alemanha 1990 Retrô",
    team: "Alemanha",
    league: "Retrô",
    price: 299.99,
    discountPrice: 259.99,
    image: "https://placehold.co/300x300/gray/white?text=Alemanha1990",
    description: "Camisa retrô da seleção alemã campeã mundial de 1990.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Algodão",
    type: "Retrô",
    reviews: [
      { id: 1, rating: 5, comment: "Design clássico!", author: "Franz Schmidt" }
    ]
  },
  {
    id: 69,
    name: "Camisa Manchester United 1999 Retrô",
    team: "Manchester United",
    league: "Retrô",
    price: 299.99,
    image: "https://placehold.co/300x300/gray/white?text=ManUtd1999",
    description: "Camisa retrô do Manchester United campeão europeu de 1999.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Algodão",
    type: "Retrô",
    reviews: [
      { id: 1, rating: 5, comment: "Qualidade impressionante!", author: "David Brown" }
    ]
  },
  {
    id: 70,
    name: "Camisa Santos 1962 Retrô",
    team: "Santos",
    league: "Retrô",
    price: 299.99,
    discountPrice: 259.99,
    image: "https://placehold.co/300x300/gray/white?text=Santos1962",
    description: "Camisa retrô do Santos campeão mundial de 1962 com Pelé.",
    sizes: ["P", "M", "G", "GG"],
    material: "100% Algodão",
    type: "Retrô",
    reviews: [
      { id: 1, rating: 5, comment: "Uma peça histórica!", author: "José Oliveira" }
    ]
  }
];
