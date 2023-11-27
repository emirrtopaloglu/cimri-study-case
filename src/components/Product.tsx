import Image from "next/image";
import styled from "styled-components";
import { Product } from "../types/data";

const StyledProductCard = styled.div`
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;
  margin-bottom: 15px;
`;

const StyledProductImage = styled.div`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding: 20px;
  cursor: pointer;
  overflow: hidden;
  text-align: center;

  & img {
    transition: transform 0.2s ease-in-out;
  }
  &:hover img {
    transform: scale(1.1);
  }
`;

const StyledProductCardBody = styled.div`
  padding: 15px 20px;
`;

const StyledTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const StyledOfferContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const StyledOfferItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 10px 8px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
    ${StyledTitle} {
      color: ${(props) => props.theme.colors.primary};
    }
  }

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export default function ProductCard(props: Product) {
  return (
    <StyledProductCard className="product">
      <StyledProductImage>
        <Image
          src={props.imageUrl}
          width="150"
          height="150"
          alt="Product"
          style={{ objectFit: "contain" }}
        />
      </StyledProductImage>
      <StyledProductCardBody>
        <StyledTitle>{props.title}</StyledTitle>
        <StyledOfferContainer>
          {props.offers.map((offer) => (
            <StyledOfferItem key={offer.id}>
              <Image
                src={offer.merchant.logo}
                width="100"
                height="30"
                alt="Merchant"
                style={{ objectFit: "contain" }}
              />
              <StyledTitle style={{ marginBottom: 0 }}>
                {offer.price ? `${offer.price} TL` : "Fiyat Bulunamadı"}
              </StyledTitle>
            </StyledOfferItem>
          ))}
        </StyledOfferContainer>
      </StyledProductCardBody>
    </StyledProductCard>
  );
}
