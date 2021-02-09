
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

export interface QuickSellCardInput {
    cardId: number;
    amount: number;
}

export interface CreateOrderInput {
    cardId: number;
    price: number;
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

export interface OrderSuccessEntity {
    id: number;
    userId: number;
    cardId: number;
    price: number;
    createdAt: DateTime;
    card: CardEntity;
}

export interface CardEntity {
    id: number;
    rarityId: number;
    name: string;
    price: number;
    hp?: string;
    number?: string;
    nationalPokedexNumber?: number;
    description?: string;
    smallImage?: ImageEntity;
    largeImage?: ImageEntity;
    rarity: RarityEntity;
    hasCard: boolean;
    amount: number;
}

export interface OrderEntity {
    id: number;
    userId: number;
    cardId: number;
    price: number;
    createdAt: DateTime;
    card: CardEntity;
}

export interface UserEntity {
    id: number;
    email: string;
    balance: number;
    stats: UserStatsEntity;
}

export interface UserStatsEntity {
    userId: string;
    packsOpened: number;
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

export interface PackEntity {
    id: number;
    title: string;
    description?: string;
    price: number;
}

export interface OrderPaginationModel {
    orders: OrderEntity[];
    pagination: PaginationModel;
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
    orders(pagination: PaginationArgs): OrderPaginationModel | Promise<OrderPaginationModel>;
    myOrders(pagination: PaginationArgs): OrderPaginationModel | Promise<OrderPaginationModel>;
    myOrderSuccess(): OrderSuccessEntity[] | Promise<OrderSuccessEntity[]>;
    packs(): PackEntity[] | Promise<PackEntity[]>;
}

export interface IMutation {
    login(loginCredentials: LoginInput): AuthUser | Promise<AuthUser>;
    register(registerCredentials: RegisterInput): AuthUser | Promise<AuthUser>;
    quickSellCard(cardInfo: QuickSellCardInput): CardEntity | Promise<CardEntity>;
    openPack(packId?: number): CardEntity[] | Promise<CardEntity[]>;
    createOrder(order: CreateOrderInput): CardEntity | Promise<CardEntity>;
    cancelOrder(orderId: number): boolean | Promise<boolean>;
    buyOrder(orderId: number): boolean | Promise<boolean>;
}

export interface ISubscription {
    balanceChanged(): number | Promise<number>;
}

export type DateTime = any;
