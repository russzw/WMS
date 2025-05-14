"use client"
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { fetchData } from '@/app/lib/adafruit';
import IotData from "@/app/lib/iot"

const GraphPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      const formattedData = fetchedData.map(item => ({
        name: new Date(item.created_at).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        }),
        'bin fill %' : parseFloat(item.value),
      }));
      setData(formattedData.reverse());
    };

    getData();
  }, []);

  return (
    <div>
       <div>
      <IotData/>
      </div>
      <h1>Adafruit IO Data</h1>
      <LineChart
        width={800}
        height={400}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip contentStyle={{ backgroundColor: '#151c2c', border: "none"}} />
        <Legend />
        <Line type="monotone" dataKey="bin fill %" stroke="#8884d8" activeDot={{ r: 8 }}  />
      </LineChart>
    </div>
  );
};

export default GraphPage;
