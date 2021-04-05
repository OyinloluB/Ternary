import React from "react";
import "../assets/styles/menu.css";

const Menu = ({
  handleMenuChange,
  showSelectField,
  selectFieldData,
  filterUtilizationMetricsData,
}) => {
  return (
    <div className="menu">
      <div className="menu_lhs">
        <select id="options" onChange={handleMenuChange}>
          <option value="">Filter Data</option>
          <option value="filterByTeams">Filter By Teams</option>
          <option value="filterByEnv">Filter By Environment</option>
        </select>
      </div>
      <div className="menu_rhs">
        {showSelectField && (
          <select
            onChange={(e) => filterUtilizationMetricsData(e.target.value)}
          >
            <option value="">Filter</option>
            {selectFieldData?.map((data) => (
              <option
                value={data}
                style={{ textTransform: "capitalize" }}
                key={data}
              >
                {data}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default Menu;
