import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { uuid } from "uuidv4";
import api from "../api/developers";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import AddDeveloper from "./AddDeveloper";
import DeveloperList from "./DeveloperList";
import DeveloperDetail from "./DeveloperDetail";
import EditDeveloper from "./EditDeveloper";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const LOCAL_STORAGE_KEY = "developers";
  const [developers, setDevelopers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  const retrieveDevelopers = async () => {
    const response = await api.get("/developers");
    return response.data;
  };



  const addDeveloperHandler = async (developer) => {
    console.log(developer);
    const request = {
      id: uuid(),
      ...developer,
    };

    const response = await api.post("/developers", request);
    console.log(response);
    setDevelopers([...developers, response.data]);
  };



  const updateDeveloperHandler = async (developer) => {
      const response = await api.put(`/developers/${developer.id}`, developer);
      const { id, name, email } = response.data;
      setDevelopers(
        developers.map((developer) => {
          return developer.id === id ? { ...response.data } : developer;
        })
      );
    };



  const removeDeveloperHandler = async (id) => {
    await api.delete(`/developers/${id}`);
    const newDeveloperList = developers.filter((developer) => {
      return developer.id !== id;
    });

    setDevelopers(newDeveloperList);
  };



  useEffect(() => {
    const getAllDevelopers = async () => {
      const allDevelopers = await retrieveDevelopers();
      if (allDevelopers) setDevelopers(allDevelopers);
    };

    getAllDevelopers();
  }, []);



  useEffect(() => {
  }, [developers]);

  // useEffect(()=>{
  //   fetch('https://randomuser.me/api/')
  //   .then(response => {

  //     if(!response){
  //       throw Error ("Error in fetching images")
  //     }
  //     return response.json()
  //   .then(Data => {

  //       setProfile(Data.results);
  //     })
  //   .catch(err=>{
  //       throw Error (err.message);
  //     });
  //   });
  // },[]);
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newDeveloperList = developers.filter((developer) => {
        return Object.values(developer)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newDeveloperList);
    } else {
      setSearchResults(developers);
    }
  };


  return (
    <div className="ui container">
   
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <DeveloperList
                {...props}
                developers={searchTerm.length < 1 ? developers : searchResults}
                getDeveloperId={removeDeveloperHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
               
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddDeveloper {...props} addDeveloperHandler={addDeveloperHandler} />
            )}
          />

          <Route
            path="/edit"
            render={(props) => (
              <EditDeveloper
                {...props}
                updateDeveloperHandler={updateDeveloperHandler}
              />
            )}
          />

          <Route path="/developer/:id" component={DeveloperDetail} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
