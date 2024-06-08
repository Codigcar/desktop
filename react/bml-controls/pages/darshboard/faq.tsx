import React from "react";
import { NextPage } from "next";
import { Layout } from "../../components/layouts";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

import { Radar } from "react-chartjs-2";
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const RadarData = {
  labels: ["Finger Strength", "Power", "Endurance", "Stability", "Flexability"],
  datasets: [
    {
      label: "March",
      backgroundColor: "rgba(242, 153, 74, .2)",
      borderColor: "rgba(242, 153, 74, 1)",
      pointBackgroundColor: "rgba(242, 153, 74, 1)",
      poingBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(242, 153, 74, 1)",
      data: [13, 10, 12, 6, 5],
    },
  ],
};

const faq: NextPage = () => {
  return (
    <Layout>
      <div style={{ width: 300, height: 300, backgroundColor:'white' }}>
        <Radar data={RadarData} />;
      </div>
    </Layout>
  );
};

export default faq;
