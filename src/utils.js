export const colors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#F4C542",
  "#E57373",
  "#64B5F6",
  "#4DB6AC",
  "#FFD54F",
  "#81C784",
  "#FF8A65",
];

export const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const typeTranslations = (type) => {
  const translations = {
    fire: "Fuego",
    water: "Agua",
    grass: "Planta",
    electric: "Eléctrico",
    ice: "Hielo",
    fighting: "Lucha",
    poison: "Veneno",
    ground: "Tierra",
    flying: "Volador",
    psychic: "Psíquico",
    bug: "Bicho",
    rock: "Roca",
    ghost: "Fantasma",
    dragon: "Dragón",
    dark: "Siniestro",
    steel: "Acero",
    fairy: "Hada",
  };

  return translations[type] || type;
};
