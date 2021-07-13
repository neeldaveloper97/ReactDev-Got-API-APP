import React, { useEffect } from "react";
import { useContext } from "react";
import { ContextProvider } from "./AppContext";
import "./componentStyle.css";

const HouseDetails = ({ location }) => {
  const houseAPI = `https://www.anapioficeandfire.com/api/houses/${location.state.id[0]}/`;

  const [houseData, setHouseData] = React.useState([]);
  const [spinnerVisible, setSpinnerVisible] = React.useState(true);

  const { setBackbutton } = useContext(ContextProvider);

  useEffect(() => {
    setBackbutton(true);
    fetchAPI();
  }, []);

  const fetchAPI = () => {
    fetch(houseAPI)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setHouseData(data);
      })
      .finally(() => {
        setSpinnerVisible(false);
      });
  };

  return spinnerVisible ? (
    <div className="full-spinner-content">
      <div class="spinner-grow" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : (
    <div className="house-details-main">
      {houseData.name !== "" ? <h4>Name : {houseData.name}</h4> : ""}
      {houseData.region !== "" ? <h4>Region : {houseData.region}</h4> : ""}
      {houseData.coatOfArms !== "" ? (
        <h4>Coat of Arms : {houseData.coatOfArms}</h4>
      ) : (
        ""
      )}
      {houseData.words !== "" ? <h4>Words : {houseData.words}</h4> : ""}
      {houseData.titles !== "" ? (
        <h4>Titles : {houseData.titles + " "}</h4>
      ) : (
        ""
      )}
      {houseData.seats !== "" ? <h4>Seats : {houseData.seats}</h4> : null}
      {houseData.diedOut !== "" ? (
        <h4>Has died out : {houseData.diedOut}</h4>
      ) : (
        ""
      )}
      {houseData.overlord !== "" ? (
        <h4>Has overlord : {houseData.overlord}</h4>
      ) : (
        ""
      )}
      {houseData.cadetBranches !== "" ? (
        <h4>Number of Cadet Branches : {houseData.cadetBranches.length}</h4>
      ) : (
        ""
      )}
    </div>
  );
};

export default HouseDetails;
