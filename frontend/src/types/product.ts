export interface Product {
  id_producto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen: string;
  id_categoria: number;
}

export type SortOption = "price-asc" | "price-desc" | "newest";
