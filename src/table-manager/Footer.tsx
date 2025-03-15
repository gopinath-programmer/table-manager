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
      <div className="button-container" >
        <button className="table-manager-button footer" onClick={() => setTabOption("Detail")}>Detail</button>
        <button className="table-manager-button footer"  onClick={() => setTabOption("Log")}>Log</button>
        <button className="table-manager-button"  onClick={() => setTabOption("Delete")}>Delete</button>
      </div>
      {tabOption === "Detail" && detail && (
        <div className="extra-card" >
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
      {tabOption === 'Log' && _.size(selectedDetails) === 1 &&(
        <div  className="extra-card" >
          See the console
        </div>
      )}
      {tabOption === 'Delete' && _.size(selectedDetails) !== 0 && (
        <div  className="extra-card" >
          Do you want to delete selected items? 
          <div className="confirmation" >
            <button onClick = {deleteSelected} className="table-manager-button">Yes</button>
            <button onClick={() => setTabOption("Delete")} className="table-manager-button">No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Footer;
