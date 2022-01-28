import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams();
  const { state } = useLocation() as RouteState;
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();

      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();

      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, []);

  console.log(info);

  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : info?.name}
        </Title>
      </Header>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <Top>
            <OverView>
              <SubHeader>Rank</SubHeader>
              <Content>{info?.rank}</Content>
            </OverView>
            <OverView>
              <SubHeader>Symbol</SubHeader>
              <Content>{info?.symbol}</Content>
            </OverView>
            <OverView>
              <SubHeader>Open Source</SubHeader>
              <Content>{info?.open_source.toString()}</Content>
            </OverView>
          </Top>
          <Description>
            <SubHeader>Description:</SubHeader>
            {info?.description}
          </Description>
          <Bottom>
            <OverView>
              <SubHeader>Total Supply</SubHeader>
              <Content>{priceInfo?.total_supply.toLocaleString()}</Content>
            </OverView>
            <OverView>
              <SubHeader>Max Supply</SubHeader>
              <Content>{priceInfo?.max_supply.toLocaleString()}</Content>
            </OverView>
          </Bottom>
        </>
      )}
    </Container>
  );
}

export default Coin;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  margin: 20px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
  font-weight: 600;
`;

const Top = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const SubHeader = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  color: ${(props) => props.theme.accentColor};
`;

const Content = styled.div`
  font-size: 23px;
  font-weight: 500;
  color: white;
`;

const OverView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  margin: 0px 10px;
  background-color: ${(props) => props.theme.darkBgColor};
  border-radius: 10px;
`;

const Description = styled.h2`
  margin: 30px 0px;
  padding: 0px 10px;
  font-size: 17px;
  line-height: 1.3;
`;

const Bottom = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

interface RouteState {
  state: {
    name: string;
  };
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
