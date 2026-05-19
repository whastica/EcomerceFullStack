export interface Category {
  id: number;
  name: string;
  slug: string;           // viene vacío "" por ahora, pero el backend lo envía
  categoryTypeName: string;
  // productCount removido — backend no lo envía
}