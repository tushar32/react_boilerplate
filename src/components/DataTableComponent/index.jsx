import React, { useState } from "react";
import { STATUS_FOR_ALL } from "../../utils/app";
import uuid from "react-uuid";
import defaultImg from "../../../../images/default-profile.png";
import Image from "../Image/Image";
import "./style.css";
const DataTableComponent = (props) => {
  const renderStatus = (status) => {
    let statusData = STATUS_FOR_ALL[status];
    if (statusData)
      return (
        <div className="d-flex align-items-center">
          <div>
            <img className="waiting-icon" src={statusData.image} />
          </div>
          <div>{statusData.lable}</div>
        </div>
      );
  };

  const renderActions = (actions, data) => {
    let dataActions = [];
    actions.map((action) => {
      dataActions.push(
        <a
          key={uuid()}
          onClick={(event) =>
            props.actionDisbale
              ? props.actionDisbale(data, action)
                ? ""
                : action.onClick(event, data[props.id])
              : action.onClick(event, data[props.id])
          }
          className={
            props.actionDisbale
              ? props.actionDisbale(data, action)
                ? "action-btns isDisabled"
                : "action-btns"
              : "action-btns"
          }
        >
          {action.image && <img src={action.image} />}

          {action.lable && <span>{action.lable}</span>}
        </a>
      );
    });
    return <div className="d-flex align-items-center">{dataActions}</div>;
  };

  const renderName = (name, image) => {
    return (
      <div className="d-flex align-items-center">
        <div className="photo">
          {(image || image === null) && (
            <Image src={image} fallbackSrc={defaultImg} />
          )}
        </div>
        <div className="student-name">{name}</div>
      </div>
    );
  };

  const renderTd = (dataColumn, data) => {
    let returnData;
    if (dataColumn.label === "Actions") {
      returnData = renderActions(dataColumn.actions, data);
    } else if (
      dataColumn.dataKey === "name" ||
      dataColumn.dataKey === "student_name"
    ) {
      returnData = renderName(data[dataColumn.dataKey], data["image"]);
    } else if (
      dataColumn.dataKey === "status" ||
      dataColumn.dataKey === "quiz_status"
    ) {
      returnData = renderStatus(data[dataColumn.dataKey]);
    } else {
      returnData = data[dataColumn.dataKey];
    }
    return returnData;
  };

  return (
    <div className="student-listing pt-40">
      <table className="table" width="100%" ref={props.componentRef}>
        <thead>
          <tr>
            {props.dataColumns.map((dataColumn) => {
              return <th key={uuid()}>{dataColumn.label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {(props.datas === undefined ||
            (props.datas && props.datas.length === 0)) && (
            <tr>
              <td
                colspan={props.dataColumns.length}
                style={{ "text-align": "center" }}
              >
                <h5>No Data Found</h5>
              </td>
            </tr>
          )}
          {props.datas &&
            props.datas.map((data) => {
              return (
                <tr key={uuid()}>
                  {props.dataColumns.map((dataColumn) => {
                    return <th key={uuid()}>{renderTd(dataColumn, data)}</th>;
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default DataTableComponent;
