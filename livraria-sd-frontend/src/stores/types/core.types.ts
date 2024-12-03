export type Session = {
    isLoading: boolean,
    auth: boolean,
    id: string;
    name: string,
    email: string,
}

export type UserData = {
    name: string,
    email: string,
}

export type MyBook = {
    id: string,
    name: string,
    author: string,
    price: string,
}

export type Book = {
    name: string,
    author: string,
    price: string,
}

export type CreateBookDto = {
    name: string,
    author: string,
    price: string,
    email: string
}