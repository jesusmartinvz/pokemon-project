export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export type TypeListResponse = {
  results: { name: string }[];
};

export type TypeDetailResponse = {
  pokemon: { pokemon: { name: string; url: string } }[];
};

export type PokemonDetailsResponse = {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    other: {
      "official-artwork": {
        front_default: string | null;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
};