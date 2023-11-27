import styled from "styled-components";
import HeaderTitle from "./HeaderTitle";
import Input from "./Input";
import Button from "./Button";
import { memo, useEffect, useState } from "react";

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
  padding-top: 10px;
  padding-bottom: 10px;
  overflow-y: auto;
`;

interface PriceFilterProps {
  title: string;
  price: number[];
  setPrice: (price: number[]) => void;
}

function PriceFilter(props: PriceFilterProps) {
  const { price, setPrice } = props;

  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);

  const handlePriceChange = () => {
    if (min > max) {
      setMin(max);
      setMax(min);
      return setPrice([max, min]);
    }
    setPrice([min, max]);
  };

  useEffect(() => {
    setMin(price[0]);
    setMax(price[1]);
  }, [price]);

  return (
    <StyledFilterContainer>
      <HeaderTitle>{props.title}</HeaderTitle>
      <StyledFilterSection>
        <Input
          type="tel"
          name="min"
          placeholder="En az (fiyat)"
          width="100%"
          style={{ marginBottom: 10, height: 30 }}
          onChange={(e) => setMin(Number(e.target.value))}
          value={min || ""}
          onKeyUp={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
        />
        <Input
          type="tel"
          name="max"
          placeholder="En çok (fiyat)"
          width="100%"
          style={{ marginBottom: 10, height: 30 }}
          onChange={(e) => setMax(Number(e.target.value))}
          value={max || ""}
          onKeyUp={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
        />
        <Button
          style={{ width: "100%" }}
          onClick={handlePriceChange}
          disabled={min == 0 || max == 0}
        >
          Uygula
        </Button>
      </StyledFilterSection>
    </StyledFilterContainer>
  );
}

export default memo(PriceFilter);
