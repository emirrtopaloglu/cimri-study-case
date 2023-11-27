import styled, { useTheme } from "styled-components";
import HeaderTitle from "./HeaderTitle";
import Input from "./Input";
import Checkbox from "./Checkbox";
import { useState } from "react";
import { slugify } from "../utils/slugify";
import type { Option, Product } from "../types/data";

const StyledFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledFilterSection = styled.div`
  width: 100%;
  max-height: 210px;
  border-bottom: 1px solid #e5e5e5;
  padding-top: 10px;
  padding-bottom: 10px;
  overflow-y: auto;
`;

const StyledFilterItem = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px;
  gap: 10px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.secondary};
`;

interface FilterSectionProps {
  title: string;
  options?: Option[];
  products: Product[];
  type: "brand" | "merchant";
  selectedFilters: Option[];
  setSelectedFilters: (filters: Option[]) => void;
}

export default function FilterSection(props: FilterSectionProps) {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState<string>("");

  const handleFilterSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (props.selectedFilters.some((filter) => filter.id == value)) {
      props.setSelectedFilters(
        props.selectedFilters.filter((filter) => filter.id != value)
      );
    } else {
      const selectedFilter = props.options?.find(
        (option) => option.id == value
      );
      if (selectedFilter) {
        props.setSelectedFilters([...props.selectedFilters, selectedFilter]);
      }
    }
  };

  const renderFilterLength = (id: string | number) => {
    if (props.type == "brand") {
      return props.products.filter((product) => product.brand.id === id).length;
    }

    if (props.type == "merchant") {
      return props.products.filter((product) =>
        product.offers.some((offer) => offer.merchant.id == id)
      ).length;
    }
  };

  return (
    <StyledFilterContainer>
      <HeaderTitle>{props.title}</HeaderTitle>
      <Input
        placeholder="Filtrele"
        width="100%"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        style={{ height: 30 }}
      />
      <StyledFilterSection>
        {props.options
          ?.filter((option) =>
            slugify(option.name).includes(slugify(searchValue))
          )
          .map((option, i) => (
            <StyledFilterItem key={i}>
              <Checkbox
                checked={props.selectedFilters.includes(option)}
                onChange={handleFilterSelect}
                value={option.id}
              />
              <span>{`${option.name} (${renderFilterLength(option.id)})`}</span>
            </StyledFilterItem>
          ))}
      </StyledFilterSection>
    </StyledFilterContainer>
  );
}
