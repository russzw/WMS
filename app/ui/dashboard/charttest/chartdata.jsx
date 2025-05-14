
import React from "react";
import Chart from "../charttest";
import Papa from "papaparse";


const MyComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse("data.csv", {
      download: true,
      header: true,
      complete: (results) => setData(results.data),
    });
  }, []);

  return <Chart data={data} />;
};