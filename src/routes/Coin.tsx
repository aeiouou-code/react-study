import { useParams } from "react-router-dom";

function Coin() {
  const { coinId } = useParams();
  return <div>Coin : {coinId}</div>;
}

export default Coin;
