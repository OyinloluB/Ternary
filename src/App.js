import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Chart from "./components/Chart";
import Menu from "./components/Menu";
import Buttons from "./components/Buttons";

const App = () => {
  const [utilizationMetrics, setUtilizationMetrics] = useState(null);
  const originalUtilizationMetric = useRef([]);
  const [selectFieldData, setSelectFieldData] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [showSelectField, setShowSelectField] = useState(null);
  const [dataDisplayedOnChart, setDataDisplayedOnChart] = useState(50);

  // Fetching the utilization metrics data
  useEffect(() => {
    axios
      .get("https://ternary.app/quiz/instanceUsage.json")
      .then((data) => {
        setUtilizationMetrics(data.data);
        originalUtilizationMetric.current = [...data.data];
      })
      .catch((err) => console.log(err));
  }, []);

  // Chart
  let memory = [];
  let cpu = [];
  let xAxisName = [];
  let teamLabelsWithDuplicate = [];
  let environmentLabelsWithDuplicate = [];

  // iterate through utilization metrics array
  for (let i = 0; i < utilizationMetrics?.length; i++) {
    // storing the cpu values
    let cpuUsage = utilizationMetrics[i].cpuUsage;
    let totalCpu = utilizationMetrics[i].cpus;

    // storing the memory values
    let memoryUsage = utilizationMetrics[i].memUsage;
    let totalMemory = utilizationMetrics[i].memory;

    // calculate the percentage of cpu and memory being used
    let cpuData = Math.round((cpuUsage / totalCpu) * 100);
    let memoryData = Math.round((memoryUsage / totalMemory) * 100);

    // push calculated value into new array
    cpu.push(cpuData);
    memory.push(memoryData);

    xAxisName.push(utilizationMetrics[i].id);
    teamLabelsWithDuplicate.push(utilizationMetrics[i].labels.team);
    environmentLabelsWithDuplicate.push(
      utilizationMetrics[i].labels.environment
    );
  }

  // Collecting single occurences of the label data
  const removeDuplicate = (arr) => arr.filter((v, i) => arr.indexOf(v) === i);

  const teamLabelWithoutDuplicate = removeDuplicate(teamLabelsWithDuplicate);
  const environmentLabelsWithoutDuplicate = removeDuplicate(
    environmentLabelsWithDuplicate
  );

  const handleMenuChange = (e) => {
    setShowSelectField(true);
    setSelectedValue(e.target.value);

    if (e.target.value === "filterByTeams") {
      setSelectFieldData(teamLabelWithoutDuplicate);
    } else if (e.target.value === "filterByEnv") {
      setSelectFieldData(environmentLabelsWithoutDuplicate);
    }
  };

  const filterUtilizationMetricsData = (value) => {
    // Creating a copy of the utilization metrics array
    const utilizationMetricsCopy = [...originalUtilizationMetric.current];

    // Filtering through the copy to find matches
    const filteredUtilizedMetricsData = utilizationMetricsCopy.filter(
      (metric) =>
        selectedValue === "filterByTeams"
          ? metric.labels.team === value.toLowerCase()
          : metric.labels.environment === value.toLowerCase()
    );

    setUtilizationMetrics(filteredUtilizedMetricsData);
  };



  return (
    <div>
      <Menu
        handleMenuChange={handleMenuChange}
        showSelectField={showSelectField}
        selectFieldData={selectFieldData}
        filterUtilizationMetricsData={filterUtilizationMetricsData}
      />
      <Buttons
        setDataDisplayedOnChart={setDataDisplayedOnChart}
        dataDisplayedOnChart={dataDisplayedOnChart}
      />
      <Chart
        utilizationMetrics={utilizationMetrics}
        memory={memory}
        cpu={cpu}
        xAxisName={xAxisName}
        dataDisplayedOnChart={dataDisplayedOnChart}
      />
    </div>
  );
};

export default App;
