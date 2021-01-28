
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface PaginationArgs {
    page: number;
    amount: number;
}

export interface CardFilterInput {
    name?: string;
    rarity?: number;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface RegisterInput {
    email: string;
    password: string;
    passwordConfirmation: string;
}

export interface UserEntity {
    id: number;
    email: string;
}

export interface ImageEntity {
    id: number;
    name: string;
    filename: string;
    url: string;
}

export interface RarityEntity {
    id: number;
    name: string;
    totalCards: number;
    cardsOwned: number;
}

export interface CardEntity {
    id: number;
    name: string;
    hp?: string;
    number?: string;
    nationalPokedexNumber?: number;
    description?: string;
    image?: ImageEntity;
    imageHRes?: ImageEntity;
    rarity: RarityEntity;
    hasCard: boolean;
    amount: number;
}

export interface AuthUser {
    id: number;
    email: string;
    accessToken: string;
}

export interface PaginationModel {
    total: number;
    count: number;
    perPage: number;
    currentPage: number;
    totalPages: number;
}

export interface CardPaginationModel {
    cards: CardEntity[];
    pagination: PaginationModel;
}

export interface CardTypeEntity {
    id: number;
    name: string;
}

export interface PokemonTypeEntity {
    id: number;
    name: string;
}

export interface IQuery {
    hello(): string | Promise<string>;
    me(): UserEntity | Promise<UserEntity>;
    cardsPaginated(pagination: PaginationArgs, filter?: CardFilterInput): CardPaginationModel | Promise<CardPaginationModel>;
    card(id: number): CardEntity | Promise<CardEntity>;
    myCards(pagination: PaginationArgs, filter?: CardFilterInput): CardPaginationModel | Promise<CardPaginationModel>;
    rarities(): RarityEntity[] | Promise<RarityEntity[]>;
    cardTypes(): CardTypeEntity[] | Promise<CardTypeEntity[]>;
    pokemonTypes(): PokemonTypeEntity[] | Promise<PokemonTypeEntity[]>;
}

export interface IMutation {
    login(loginCredentials: LoginInput): AuthUser | Promise<AuthUser>;
    register(registerCredentials: RegisterInput): AuthUser | Promise<AuthUser>;
    openPack(): CardEntity[] | Promise<CardEntity[]>;
}
