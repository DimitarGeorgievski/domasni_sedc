export interface Books{
    id: string;
    title: string;
    author: string;
    price: number;
}
export interface BooksFilter{
    minPrice?: number | null;
    author?: string | null;
}