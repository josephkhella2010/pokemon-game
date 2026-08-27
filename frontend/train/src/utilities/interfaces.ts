export interface ProductsType {
  id: number | string;
  name: string;
  description: string;
  price: number | null;
}

export interface inputArrValType {
  name: string;
  description: string;
  price: number | null;
}

export interface inputArrType {
  name: string;
  placeholder?: string;
  label: string;
  type: string;
}

export interface PokemonItemsType {
  _id: string;
  name: string;
  img: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}
