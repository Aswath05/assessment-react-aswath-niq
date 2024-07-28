import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { IProduct } from "../types/CategoryTypes";

interface BarChartProps {
  productData: IProduct[]
}

const BarChart = ({ productData }: BarChartProps) => {

  /**
   * Transforms initiak data for bar chart
   */
  const columnChart = productData.reduce(
    (acc, curr) => {
      acc.data.push(curr.price);
      acc.categories.push(curr.name);
      return acc
    },
    {
      categories: [],
      data: [],
      chartName: productData[0].category,
    }
  );

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: `Chart for ${columnChart.chartName} products`,
    },
    xAxis: {
      categories: columnChart.categories,
    },
    yAxis: {
      title: {
        text: "Price $",
      },
    },
    series: [
      {
        name: `${columnChart.chartName} products`,
        data: columnChart.data,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BarChart;
