import React,{useRef} from "react";
import DeveloperCard from "./DeveloperCard";
import { Link } from "react-router-dom";

const DeveloperList = (props) => {
  console.log(props);
  const inputEl = useRef("");
  const deleteDeveloperHandler = (id) => {
    props.getDeveloperId(id);
  };
  const renderDeveloperList = props.developers.map((developer) => {
    return (
      <DeveloperCard
        developer={developer}
        clickHander={deleteDeveloperHandler}
        key={developer.id}
      />
    ); 
  });
  const getSearchTerm = () => {
    props.searchKeyword(inputEl.current.value);
  };
  return (
    <div className="main">
      <h4>
        Developer List
        <Link to="/add">
          <button className="ui button blue right">Add Developer</button>
        </Link>
      </h4>
      <div className="ui search">
        <div className="ui icon input">
          <input
            ref={inputEl}
            type="text"
            placeholder="Search Developer"
            className="prompt"
            value={props.term}
            onChange={getSearchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">
        {renderDeveloperList.length > 0
          ? renderDeveloperList
          : "No Developer available"}
      </div>
    </div>
  );
};

export default DeveloperList;
