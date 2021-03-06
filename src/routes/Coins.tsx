import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins, ICON_URL } from "../api";
import { Helmet } from "react-helmet";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  return (
    <Container>
      <Helmet>
        <title>Coin</title>
      </Helmet>
      <ToggleBtn>
        <button onClick={toggleDarkAtom}>
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>
      </ToggleBtn>
      <Header>
        <Title>Coin</Title>
      </Header>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`${ICON_URL}/${coin.symbol.toLowerCase()}`}
                  alt="icon"
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const ToggleBtn = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 20px;

  button {
    padding: 10px;
    background-color: ${(props) => props.theme.cardColor};
    font-weight: 500;
    font-size: 14px;
    border-radius: 5px;

    :hover {
      background-color: ${(props) => props.theme.accentColor};
      transition: background-color 0.4s;
    }
  }
`;

const Header = styled.header`
  margin: 40px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
`;

const Loading = styled.div`
  text-align: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 15px;
  font-size: 18px;

  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }

  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
