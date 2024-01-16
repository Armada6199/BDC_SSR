import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function CustomBarChat({ totalAppliedLayers,layersLocale,totalAppliedLabel,appliedInterestLabel }) {
  const lastIncludedLayer = totalAppliedLayers[totalAppliedLayers.length - 1];
  const labels=layersLocale.map(e=>(e.localeContent))

  const maxAmount =
    lastIncludedLayer.totalInterestApplied + lastIncludedLayer.max;
  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        beginAtZero: true,
      },
      y: {
        stacked: true,
        min: 0,
        max: maxAmount,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: totalAppliedLabel,
        data: totalAppliedLayers.map((ele) => ele.deductedAmount),
        backgroundColor: "#dd752d",
      },
      {
        label: appliedInterestLabel,
        data: totalAppliedLayers.map((ele) => ele.totalInterestApplied),
        backgroundColor: "#424242",
      },
    ],
  };
  return <Bar height={"100%"} width={"100%"} options={options} data={data} />;
}
