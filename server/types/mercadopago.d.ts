declare module "mercadopago" {
  export interface Item {
    id: string;
    title: string;
    unit_price: number;
    quantity: number;
    currency_id: string;
    description?: string;
    picture_url?: string;
  }

  export interface PreferenceRequest {
    items: Item[];
    back_urls?: {
      success: string;
      failure: string;
      pending: string;
    };
    auto_return?: string;
    metadata?: Record<string, any>;
  }
}
