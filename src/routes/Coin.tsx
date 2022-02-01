import {
  useLocation,
  useParams,
  useMatch,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet";

function Coin() {
  const { coinId } = useParams() as IParams;
  const { state } = useLocation() as RouteState;
  const chartMatch = useMatch(`/${coinId}/chart`);
  const priceMatch = useMatch(`/${coinId}/price`);

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId!)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId!),
    { refetchInterval: 5000 }
  );

  const loading = infoLoading || tickersLoading;

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Back>
        <BackBtn onClick={goBack}>Back</BackBtn>
      </Back>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <Top>
            <OverView>
              <SubHeader>Rank</SubHeader>
              <Content>{infoData?.rank}</Content>
            </OverView>
            <OverView>
              <SubHeader>Symbol</SubHeader>
              <Content>{infoData?.symbol}</Content>
            </OverView>
            <OverView>
              <SubHeader>Price</SubHeader>
              <Content>${tickersData?.quotes.USD.price.toFixed(2)}</Content>
            </OverView>
          </Top>
          <Description>
            <SubHeader>Description:</SubHeader>
            {infoData?.description}
          </Description>
          <Bottom>
            <OverView>
              <SubHeader>Total Supply</SubHeader>
              <Content>{tickersData?.total_supply.toLocaleString()}</Content>
            </OverView>
            <OverView>
              <SubHeader>Max Supply</SubHeader>
              <Content>{tickersData?.max_supply.toLocaleString()}</Content>
            </OverView>
          </Bottom>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Routes>
            <Route path="chart" element={<Chart coinId={coinId} />} />
            <Route path="price" element={<Price coinId={coinId} />} />
          </Routes>
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
  margin: 20px 0px 40px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Back = styled.div`
  margin: 20px 10px;
`;

const BackBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 10px;
  background-color: ${(props) => props.theme.cardColor};
  border: 1px solid ${(props) => props.theme.cardBorderColor};
  font-weight: 500;

  svg {
    margin-right: 8px;
    fill: white;
  }

  :hover {
    color: ${(props) => props.theme.accentColor};
    transition: color 0.3s ease-in;
  }

  :hover svg {
    fill: ${(props) => props.theme.accentColor};
    transition: fill 0.3s ease-in;
  }
`;

const Loading = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  font-size: 45px;
  font-weight: 700;
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
  color: ${(props) => props.theme.textColor};
`;

const OverView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  margin: 0px 10px;
  background-color: ${(props) => props.theme.cardColor};
  border: 1px solid ${(props) => props.theme.cardBorderColor};
  border-radius: 10px;
`;

const Description = styled.h2`
  margin: 30px 0px;
  padding: 0px 10px;
  font-size: 17px;
  line-height: 1.3;
  font-weight: 400;
`;

const Bottom = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 30px;
`;

const Tab = styled.div<{ isActive: boolean }>`
  text-align: center;
  padding: 20px;
  margin: 0px 10px;
  font-size: 20px;
  border-bottom: 1px solid white;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};

  border-bottom: 2px solid
    ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.bgColor};

  a {
    display: block;
  }

  :hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

type IParams = { coinId: string };

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
