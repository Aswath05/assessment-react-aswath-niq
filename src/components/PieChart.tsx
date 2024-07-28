// import React from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { IProduct } from "../types/CategoryTypes";

interface PieChartTypes {
    productCategories : IProduct[]
}

const PieChart = ({ productCategories }: PieChartTypes) => {

  /**
   * Transforms data based on product categories for charts
   */
  const chartData = productCategories.map((product) => {
    const rndInt = Math.floor(Math.random() * 5) + 1 // randomly picking a number b/w 1 to 5
    return {
      name: product.name,
      y: rndInt, //assuming the total number of prducts
    };
  });

  const options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Product by categories",
    },
    series: [
      {
        name: "Products",
        data: chartData,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PieChart;
