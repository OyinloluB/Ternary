import React from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = ({ memory, cpu, xAxisName, dataDisplayedOnChart, color }) => {
  const series = [
    {
      name: "CPU (%)",
      data: !cpu ? [] : cpu.slice(0, dataDisplayedOnChart),
    },
    {
      name: "RAM (%)",
      data: !memory ? [] : memory.slice(0, dataDisplayedOnChart),
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
      stackType: "100%",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: xAxisName.slice(0, dataDisplayedOnChart),
    },
    yaxis: {
      title: {
        text: "",
      },
    },
    fill: {
      opacity: 1,
      // colors: [
        // attempting to display different colors to show user level of utilization.
        // where red = overutilized
        // green = okay
        // yellow = underutilized
        //   function ({ value, seriesIndex, w }) {
        //     if (!value) {
        //       return;
        //     } else {
        //       if (value < 66) {
        //         return "#ffff00";
        //       } else if (value >= 66 && value <= 90) {
        //         return "#00ab66";
        //       } else if (value > 90) {
        //         return "#ff000";
        //       }
        //     }
        //   },
        //   function ({ value, seriesIndex, w }) {
        //     if (!value) {
        //       return;
        //     } else {
        //       if (value < 66) {
        //         return "#ffff00";
        //       } else if (value >= 66) {
        //         return "#00ab66";
        //       } else if (value <= 90) {
        //         return "#00ab66";
        //       } else if (value > 90) {
        //         return "#ff000";
        //       }
        //     }
        //   },
      // ],
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      onItemHover: {
        highlightDataSeries: true,
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={900}
      />
    </div>
  );
};

export default ApexChart;
