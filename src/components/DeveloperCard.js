import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png";

const DeveloperCard = (props) => {
  const { id, name, email } = props.developer;

  // useEffect(() => {
  //   fetch('https://www.avatarapi.com/js.aspx?email='+{email}+'&size=128')
  //   .then(response => {
  //     console.log('response',response);
  //     if(!response){
  //       throw Error ("Error in fetching images")
  //     }
  //     return response.json()
  //   .then(Data => {

  //       setProfile(Data);
  //     })
  //   .catch(err=>{
  //       throw Error (err.message);
  //     });
  //   });

  // }, [])
  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="user" />
      <div className="content">
        <Link
          to={{ pathname: `/developer/${id}`, state: { developer: props.developer } }}
        >
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>
      </div>
      <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px", marginLeft: "10px" }}
        onClick={() => props.clickHander(id)}
      ></i>
     
      <Link to={{ pathname: `/edit`, state: { developer: props.developer } }}>
 
        <i
          className="edit alternate outline icon"
          style={{ color: "green", marginTop: "7px" }}
        ></i>
      </Link>
    </div>
  );
};

export default DeveloperCard;
