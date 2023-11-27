import FilterSection from "../components/FilterSection";
import type { Brand, Option, Product } from "../types/data";
import PriceFilter from "../components/PriceFilter";

interface SidebarLeftProps {
  brands: Brand[];
  selectedBrands: Option[];
  setSelectedBrands: (options: Option[]) => void;
  merchants: Option[];
  selectedMerchants: Option[];
  setSelectedMerchants: (options: Option[]) => void;
  products: Product[];
  filteredProducts: Product[];
  price: number[];
  search: string;
  setPrice: (price: number[]) => void;
}

export default function SidebarLeft(props: SidebarLeftProps) {
  const {
    brands,
    merchants,
    products,
    filteredProducts,
    search,
    price,
    setPrice,
    selectedBrands,
    setSelectedBrands,
    selectedMerchants,
    setSelectedMerchants
  } = props;
  return (
    <>
      <FilterSection
        title="Marka Filtresi"
        type="brand"
        options={brands}
        products={
          search.length > 0 || price.length > 0 || selectedMerchants.length > 0
            ? filteredProducts
            : products
        }
        selectedFilters={selectedBrands}
        setSelectedFilters={setSelectedBrands}
      />
      <FilterSection
        title="Satıcı Filtresi"
        type="merchant"
        options={merchants}
        products={
          selectedBrands.length > 0 ||
          price.length > 0 ||
          search.length > 0 ||
          selectedMerchants.length > 0
            ? filteredProducts
            : products
        }
        selectedFilters={selectedMerchants}
        setSelectedFilters={setSelectedMerchants}
      />
      <PriceFilter title="Fiyat Aralığı" price={price} setPrice={setPrice} />
    </>
  );
}
