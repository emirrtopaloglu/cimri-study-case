import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Container from "../components/Container";
import SidebarLeft from "../views/SidebarLeft";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import data from "../../public/data.json";
import type { Brand, Merchant, Offer, Product, Option } from "../types/data";
import { slugify } from "../utils/slugify";
import Page from "../components/Page";
import ProductCard from "../components/Product";
import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import Button from "../components/Button";
import Badge from "../components/Badge";
import useDebounce from "../hooks/useDebounce";

const StyledProductList = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > div {
    width: calc(100% / 3 - 20px);
    margin-left: 20px;
    margin-bottom: 20px;
  }

  @media (max-width: 1024px) {
    & > div {
      width: calc(100% / 2 - 20px);
      &:nth-child(2n + 1) {
        margin-left: 0;
      }
    }
  }

  @media (max-width: 768px) {
    & > div {
      width: 100%;
      margin-left: 0;
    }
  }
`;

const StyledFilterContainer = styled.div`
  padding-left: 20px;
  /* padding-top: 20px; */
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  & > * {
    margin-bottom: 10px;
  }

  // ?? mobilde scroll kaldırmak için (optional)
  @media (max-width: 768px) {
    padding-left: 0;
    /* padding: 0;
    flex-wrap: wrap;
    overflow: auto;

    & > * {
      margin-bottom: 10px;
    } */
  }
`;

const StyledHeaderText = styled.div`
  padding-left: 20px;

  @media screen and (max-width: 1024px) {
    padding-left: 0;
  }
`;

export default function Home({
  brands,
  merchants,
  products
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [page, setPage] = useState(1);
  const [selectedBrands, setSelectedBrands] = useState<Option[]>([]);
  const [selectedMerchants, setSelectedMerchants] = useState<Option[]>([]);
  const [price, setPrice] = useState<number[]>([]);
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    // ?? filtre değiştiğinde sayfayı 1'e döndür
    setPage(1);
  }, [selectedBrands, selectedMerchants, price, debouncedSearch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const handleFilter = useCallback(
    (product: Product) => {
      return (
        product.title.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
        (selectedBrands.length
          ? selectedBrands.some((brand) => brand.id == product.brand.id)
          : true) &&
        product.offers.some((offer) => {
          // ?? sidebardaki ürün sayısı gösterme kısmında bana garip gelen bir yer var
          // ?? örneğin Array.some() kullandığımda trendyol seçili değil ve 0 ürün var trendyol (0) yazıyor
          // ?? trendyolu seçtiğimde onun ürünlerini de dahil ediyor ver trendyol (16) gibi oluyor
          // ?? Array.every() kullanırsam ve birden fazla merchant seçersem her ikisinin de olduğu ürünleri gösteriyor
          // ?? üçüncü bir merchant seçince haliyle 0 oluyor bunu ilk olarak every ile yapmıştım
          // ?? sayıların gösterimi biraz sıkıntılı gibi geldi ama filtreleme bu şekilde daha mantıklı geldi
          const merchantFilter =
            selectedMerchants.length > 0
              ? selectedMerchants.some((merchant) =>
                  product.offers.find(
                    (offer) => offer.merchant.id == merchant.id
                  )
                )
              : true;
          const priceFilter = price.length
            ? price[0] <= (offer?.price || 0) && (offer?.price || 0) <= price[1]
            : true;

          return merchantFilter && priceFilter;
        })
      );

      return true;
    },
    [selectedBrands, selectedMerchants, price, debouncedSearch]
  );

  const filteredProducts = products.filter(handleFilter);

  return (
    <>
      <Head>
        <title>Cimri Study Case</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header setSearch={setSearch} />

      <Container>
        <Sidebar>
          <SidebarLeft
            brands={brands}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            merchants={merchants}
            search={debouncedSearch}
            selectedMerchants={selectedMerchants}
            setSelectedMerchants={setSelectedMerchants}
            products={products}
            filteredProducts={filteredProducts}
            price={price}
            setPrice={setPrice}
          />
        </Sidebar>
        <Page>
          <div style={{ paddingTop: 15, paddingBottom: 15 }}>
            <StyledFilterContainer>
              {price.length > 0 && (
                <Badge style={{ marginRight: 10 }} onClick={() => setPrice([])}>
                  {`${price[0]} - ${price[1]} TL aralığı`}
                </Badge>
              )}
              {selectedBrands.map((option: Option) => (
                <Badge
                  style={{ marginRight: 10 }}
                  key={option.id}
                  onClick={() =>
                    setSelectedBrands((prev) =>
                      prev.filter((brand) => brand.id != option.id)
                    )
                  }
                >
                  {option.name}
                </Badge>
              ))}
              {selectedMerchants.map((option: Option) => (
                <Badge
                  style={{ marginRight: 10 }}
                  key={option.id}
                  onClick={() =>
                    setSelectedMerchants((prev) =>
                      prev.filter((merchant) => merchant.id != option.id)
                    )
                  }
                >
                  {option.name}
                </Badge>
              ))}
            </StyledFilterContainer>
            <StyledHeaderText>
              {filteredProducts.length > 0
                ? `${filteredProducts.length} ürün bulundu`
                : null}
            </StyledHeaderText>
          </div>
          {filteredProducts.length > 0 ? (
            <StyledProductList>
              {filteredProducts
                .slice((page - 1) * 9, page * 9)
                .map((product: Product) => (
                  <ProductCard
                    id={product.id}
                    key={product.id}
                    title={product.title}
                    imageUrl={product.imageUrl}
                    brand={product.brand}
                    offers={product.offers}
                  />
                ))}
            </StyledProductList>
          ) : (
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              Seçilen kriterlere göre ürün bulunamadı.
            </div>
          )}
          {filteredProducts.length > 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "0 20px 20px"
              }}
            >
              <Button
                onClick={() => setPage((prev) => prev - 1)}
                disabled={page == 1}
                style={{ width: 100 }}
              >
                Önceki
              </Button>
              <span style={{ margin: "0 25px" }}>{page}</span>
              <Button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={page == Math.ceil(filteredProducts.length / 9)}
                style={{ width: 100 }}
              >
                Sonraki
              </Button>
            </div>
          )}
        </Page>
      </Container>
    </>
  );
}

export const getStaticProps = (async (context) => {
  const brands: Brand[] = [];
  const merchants: Merchant[] = [];
  const products: Product[] = [];

  data.forEach((item) => {
    const brandItem: Brand = {
      id: slugify(item.brand.name),
      name: item.brand.name
    };
    if (!brands.find((brand) => brand.id == brandItem.id)) {
      brands.push(brandItem);
    }

    item.topOffers.forEach(({ merchant }) => {
      const merchantItem: Merchant = {
        id: merchant.id,
        name: merchant.name,
        url: merchant.url,
        logo: merchant.logo
      };
      if (!merchants.find((merchant) => merchant.id == merchantItem.id)) {
        merchants.push(merchantItem);
      }
    });

    const productItem: Product = {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      brand: brandItem,
      offers: item.topOffers
        .map(({ id, merchant, price }) => {
          const offerItem: Offer = {
            id,
            merchant: {
              id: merchant.id,
              name: merchant.name,
              url: merchant.url,
              logo: merchant.logo
            },
            price
          };
          return offerItem;
        })
        .sort((a, b) => (a?.price || 0) - (b?.price || 0))
    };

    products.push(productItem);
  });

  products.sort((a, b) => {
    return (a.offers[0]?.price || 0) - (b.offers[0]?.price || 0);
  });

  return {
    props: {
      brands,
      merchants,
      products
    }
  };
}) as GetStaticProps;
