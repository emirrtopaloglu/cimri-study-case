export type Product = {
  id: number;
  title: string;
  imageUrl: string;
  brand: Brand;
  offers: Offer[];
};

export type Brand = {
  id: string;
  name: string;
};

export type Offer = {
  id: number;
  price?: number | null;
  merchant: Merchant;
};

export type Merchant = {
  id: number;
  name: string;
  url: string;
  logo: string;
};

export type Option = {
  id: number | string;
  name: string;
};
