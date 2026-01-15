export interface Episode {
    id: string;
    name: string;
    episode: string;
}

export interface Location {
    name: string;
}

export interface Character {
    id: string;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Location;
    location: Location;
    image: string;
    episode: Episode[];
}

export interface Info {
    count: number;
    pages: number;
    next: number | null;
    prev: number | null;
}

export interface CharacterData {
    characters: {
        info: Info;
        results: Character[];
    };
}
