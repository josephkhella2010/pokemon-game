import type { inputArrType } from "./interfaces";

export const inputArr: inputArrType[] = [
  {
    name: "name",
    type: "text",
    placeholder: "please enter name",
    label: "Name",
  },
  {
    name: "description",
    type: "text",
    placeholder: "please enter description",
    label: "Description",
  },
  {
    name: "price",
    type: "number",
    label: "Price",
  },
];

export const createId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  const idCreator = Array.from(
    { length: 7 },
    () => letters[Math.floor(Math.random() * letters.length)],
  ).join("");

  return idCreator;
};

interface ApiOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  data?: unknown;
}

const API_URL = "https://pokemon-game-462k.onrender.com/api";

export const ApiUrl = async ({ method, endpoint, data }: ApiOptions) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },

    body: method !== "GET" && data ? JSON.stringify(data) : undefined,
  });

  const result = await response.json();

  return result;
};

export const Url = {
  normal:
    "https://raw.githubusercontent.com/partywhale/pokemon-type-icons/master/icons/normal.svg",
  fighting:
    "https://raw.githubusercontent.com/partywhale/pokemon-type-icons/master/icons/fighting.svg",
  flying:
    "https://raw.githubusercontent.com/partywhale/pokemon-type-icons/master/icons/flying.svg",
  poison:
    "https://raw.githubusercontent.com/partywhale/pokemon-type-icons/master/icons/poison.svg",
  ground:
    "https://raw.githubusercontent.com/partywhale/pokemon-type-icons/master/icons/ground.svg",
  rock: "https://raw.githubusercontent.com/partywhale/pokemon-type-icons/master/icons/rock.svg",
  bug: "https://raw.githubusercontent.com/partywhale/pokemon-type-icons/master/icons/bug.svg",
  ghost:
    "https://raw.githubusercontent.com/partywhale/pokemon-type-icons/master/icons/ghost.svg",
  steel:
    "https://raw.githubusercontent.com/partywhale/pokemon-type-icons/master/icons/steel.svg",
  fire: "https://raw.githubusercontent.com/partywhale/pokemon-type-icons/master/icons/fire.svg",
  water:
    "https://raw.githubusercontent.com/partywhale/pokemon-type-icons/master/icons/water.svg",
  grass:
    "https://raw.githubusercontent.com/partywhale/pokemon-type-icons/master/icons/grass.svg",
  electric:
    "https://raw.githubusercontent.com/partywhale/pokemon-type-icons/master/icons/electric.svg",
  psychic:
    "https://raw.githubusercontent.com/partywhale/pokemon-type-icons/master/icons/psychic.svg",
  ice: "https://raw.githubusercontent.com/partywhale/pokemon-type-icons/master/icons/ice.svg",
  dragon:
    "https://raw.githubusercontent.com/partywhale/pokemon-type-icons/master/icons/dragon.svg",
  dark: "https://raw.githubusercontent.com/partywhale/pokemon-type-icons/master/icons/dark.svg",
  fairy:
    "https://raw.githubusercontent.com/partywhale/pokemon-type-icons/master/icons/fairy.svg",
};
