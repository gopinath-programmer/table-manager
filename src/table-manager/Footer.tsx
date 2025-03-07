/** @format */

import React from "react";
import { useTableContext } from "./TableProvider";
import { Detail } from "./data";
import _ from "lodash";

function Footer() {
  const { tableData, selectedDetails, tabOption, setTabOption , deleteSelected } = useTableContext();
  
  const detailForShow: Detail[] = _.filter(tableData, (detail) =>
    _.includes(selectedDetails, detail.id)
  );

  const detail = detailForShow.length === 1 ? detailForShow[0] : null;

  return (
    <div>
      <div>
        <button onClick={() => setTabOption("Detail")}>Detail</button>
        <button onClick={() => setTabOption("Log")}>Log</button>
        <button onClick={() => setTabOption("Delete")}>Delete</button>
      </div>
      {tabOption === "Detail" && detail && (
        <div>
          <h3>Detail For: {detail.name}</h3>
          <div>
            <p>{detail.description}</p>
          </div>
          <div>
            <p>It is Used to Cook: {detail.shouldCook ? 'Yes' : 'No'}</p>
          </div>
          <div>
            <p>It has Nutritions: {_.join(detail.nutrition, ", ")}</p>
          </div>
          <div>
            <p>We should take {detail.quantity} per day</p>
          </div>
          <a href={detail.link} target="_blank" rel="noopener noreferrer">
            <button className="learn-button">Learn More</button>
          </a>
        </div>
      )}
      {tabOption === 'Log' && (
        <div>
          See the console
        </div>
      )}
      {tabOption === 'Delete' && _.size(selectedDetails) !== 0 && (
        <div>
          Do you want to delete selected items? 
          <div>
            <button onClick = {deleteSelected}>Yes</button>
            <button onClick={() => setTabOption("Delete")}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Footer;
