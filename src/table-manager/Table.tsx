import React from "react";
import { useTableContext } from "./TableProvider";
import Form from "./Form";
import _ from "lodash";

const tableHeader = ["  " ,"ID" , "Name" , "Descrition" , "Link" , "Should Cook" , "Nutritions" , " Max.Intake per Day" , "Actions"]
function Table(){
  const {tableData , setSelectedDetails   , deleteRow } = useTableContext();

  return (
    <table className="table-manager-table">
      <thead>
        <tr className="table-manager-rows" >
        {
          _.map(tableHeader , (title , index) => (
            <th key = {index} className="table-manager-columns" >{title}</th>
          ))
        }
        </tr>
      </thead>
      <tbody>
        {
          _.map(tableData , (details,i) => (
            <tr className="table-manager-rows" key={i}>
              <td className="table-manager-columns" ><input type="checkbox" onChange={() => setSelectedDetails(details.id)} /></td>
            {_.map(_.values(details) , (detail , j) => (
              <td className="table-manager-columns" key={j} >{_.isArray(detail) ? _.join(detail , ',') : _.toString(detail)}</td>
            ))}
            <td className="table-manager-columns" onClick={() => deleteRow(details.id)} ><button className="table-manager-button" >delete</button></td>
            </tr>
          ))
        } 
        < Form/>
      </tbody>
    </table>
  )


}
export default Table;