/** @format */

import React, { ChangeEvent, useState } from "react";
import { Detail } from "./data";
import _ from "lodash";
import { useTableContext } from "./TableProvider";
import { nutritions } from "./data";

const initialDetail: Detail = {
  id: 3,
  name: "",
  description: "",
  link: "",
  shouldCook: true,
  nutrition: [],
  quantity: "",
};
function Form() {
  const [details, setDetails] = useState<Detail>(initialDetail);
  const [isNutritions, setIsNutritions] = useState<boolean>(false);
  let { id, name, description, link, nutrition, quantity } = details;

  const { addRow } = useTableContext();

  const setFormDetails = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "shouldCook") {
      if (e.target.value === "Yes") {
        setDetails((prev) => ({ ...prev, [e.target.name]: true }));
      } else {
        setDetails((prev) => ({ ...prev, [e.target.name]: false }));
      }
      return;
    }
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const setShowNutritions = () => {
    setIsNutritions(!isNutritions);
  };

  const setNutritions = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDetails((prev) => {
      const newNutrition = _.includes(prev.nutrition, value)
        ? _.without(prev.nutrition, value)
        : [...prev.nutrition, value];
      return { ...prev, nutrition: newNutrition };
    });
  };

  const setAdd = () => {
    addRow(details);
    setDetails({ ...initialDetail, id: details.id + 1 });
  };

  return (
        <tr className="table-manager-rows">
          <td  className="table-manager-columns" > </td>
          <td className="table-manager-columns id" >{id}</td>
          <td className="table-manager-columns" >
            <input
              type="text"
              name="name"
              value={name}
              onChange={setFormDetails}
            />
          </td>
          <td  className="table-manager-columns" >
            <input
              type="text"
              name="description"
              value={description}
              onChange={setFormDetails}
            />
          </td>
          <td className="table-manager-columns" >
            <input
              type="text"
              name="link"
              value={link}
              onChange={setFormDetails}
            />
          </td>
          <td className="table-manager-columns" >
            <div>
              <input
                type="radio"
                name="shouldCook"
                value="Yes"
                onChange={setFormDetails}
              />
              Yes
            </div>
            <div>
              <input
                type="radio"
                name="shouldCook"
                value="No"
                onChange={setFormDetails}
              />
              No
            </div>
          </td>
          <td className="table-manager-columns" >
            <input
              type="text"
              name="nutrition"
              value={_.join(nutrition, ",")}
              onClick={setShowNutritions}
              onChange={setFormDetails}
              readOnly
            />
            {isNutritions && <div className="nutritons-container" >
              {_.map(nutritions, (nut , i) => (
                <div className="nutritions-list" key={i}>
                  <input
                    type="checkbox"
                    value={nut.value}
                    checked={_.includes(nutrition, nut.value)}
                    onChange={setNutritions}
                  />
                  <span>{nut.label}</span>
                </div>
              ))}
            </div>}
          </td>
          <td className="table-manager-columns" >
            <input
              type="text"
              name="quantity"
              value={quantity}
              onChange={setFormDetails}
            />
          </td>
          <td className="table-manager-columns" >
            <button onClick={setAdd} className="table-manager-button" >Add</button>
          </td>
        </tr>
  );
}

export default Form;
