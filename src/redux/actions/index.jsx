import React from "react";
import useDataApi from "../../customHooks/useDataApi";
import { getValue } from "../../utils/app";
import CrossLink from "./../Layout/Ui/CrossLink";
import apiService from "../../services/apiService";
import "./style.css";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const LessionDetailComponent = (props) => {
  const [data, isLoading, isError] = useDataApi(
    `api/`+localStorage.portal+`/lessondetails&id=${getValue(
      props,
      "props.match.params.id"
    )}`,
    { param: [] },
    ""
  );
  const lessonsDetail = getValue(data, "data.result");
  
const markCompleted =  ()   => {
  const data= { lesson_id : props.match.params.id}
  apiService.post("api/"+localStorage.portal+"/marklessoncompleted", data).then(
    (response) => {
      toast.success("Lesson Mark Completed!");
      props.propsData.history.push({
        pathname: localStorage.prefix + "/levels/view"+ getValue(lessonsDetail, "lessonsDetail.level_id")
      });
    },
    (error) => {
      toast.error("Company update Failed!");
    }
  );
}
 
  return (
    <>
      <div className="title-bar d-flex pb-40 justify-content-between align-items-center">
        <div className="title-add">
          <span className="font-15 black-color a-bold mr-3">
            <CrossLink url="/courses" />
           Courses / {getValue(lessonsDetail, "lessonsDetail.coursename")} / 
           Levels / {getValue(lessonsDetail, "lessonsDetail.leveltitle")} /  Lessons / {getValue(lessonsDetail, "lessonsDetail.title")}
          </span>
        </div>
      </div>
      <div className="blue_division w-100 text-left">
        <div className="container_middle">
          <div className="blue_title_first r-regular white font-20">
            Level {getValue(lessonsDetail, "lessonsDetail.levellnumber")}{" "}
            {getValue(lessonsDetail, "lessonsDetail.leveltitle")}
          </div>
          <div className="blue_title_two r-bold white">
            Lesson {getValue(lessonsDetail, "lessonsDetail.number")}{" "}
            {getValue(lessonsDetail, "lessonsDetail.title")}
          </div>
        </div>
      </div>

      <div className="center_division d-inline-block w-100 align-top">
        <div className="container">
          <div className="row">
            <div className="col-md-12 part_left mb-5 a-regular black-color">
              {getValue(lessonsDetail, "lessonsDetail.text")}
            </div>

            <div className="col-md-12 text-center part_left a-regular black-color">
            {  !getValue(lessonsDetail, "lessonsDetail.iscompleted") ? (
              <Button onClick={e=> markCompleted } className="btn-warning white capitalize a-bold"> Mark as completed</Button>
            ): '' }
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
};
export default LessionDetailComponent;
