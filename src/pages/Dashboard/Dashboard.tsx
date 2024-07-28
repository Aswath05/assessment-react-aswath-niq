import { useEffect, useState } from "react";
import Filters from "../../components/Filters";
import PieChart from "../../components/PieChart";
import { Category } from "../../models/Category";
import { ICategory, IProduct } from "../../types/CategoryTypes";
import BarChart from "../../components/BarChart";

const Dashboard = () => {
  const [productCategories, setProductCategories] = useState([]);
  const [reportData, setReportData] = useState({
    runReport: false,
    products: [],
  });

  /**
   * get api for fetching product categories
   */
  const getAllProductCategories = async () => {
    await fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setProductCategories(data.map((dt: ICategory) => new Category(dt)));
      });
  };

  const handleReport = (data: { runReport: boolean; products: IProduct[] }) => {
    // console.log(data)
    setReportData(data);
  };

  useEffect(() => {
    getAllProductCategories(); // calls api on initial mount
  }, []);

  return (
    <div className="flex flex-row gap-10 p-4 h-full">
      <Filters
        productCategories={productCategories}
        runReportHandler={handleReport}
      />
      <div className="flex items-center justify-center w-full">
        {!reportData.runReport ? (
          <PieChart productCategories={productCategories} />
        ) : (
          <BarChart productData={reportData.products} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
