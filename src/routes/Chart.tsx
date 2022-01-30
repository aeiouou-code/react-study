import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import styled from "styled-components";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId!)
  );

  return (
    <div>
      {isLoading ? (
        <Loading>Loading Chart...</Loading>
      ) : (
        <ChartWrapper>
          <ApexChart
            type="line"
            series={[
              {
                name: "Price",
                data: data?.map((price) => price.close),
              },
            ]}
            options={{
              theme: {
                mode: "dark",
              },
              chart: {
                animations: {
                  enabled: false,
                },
                background: "transparent",
                height: 400,
                toolbar: {
                  show: false,
                },
              },
              grid: { show: false },
              stroke: {
                curve: "smooth",
                width: 3,
              },
              yaxis: { show: false },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                type: "datetime",
                categories: data?.map((date) => date.time_close),
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["#9D89FE"], stops: [0, 100] },
              },
              colors: ["#FE10D4"],
              tooltip: {
                y: { formatter: (val) => `$${val.toFixed(2)}` },
              },
            }}
          />
        </ChartWrapper>
      )}
    </div>
  );
}

const Loading = styled.div`
  text-align: center;
`;

const ChartWrapper = styled.div`
  padding: 0px 10px;
  border-radius: 5px;
`;

export default Chart;
