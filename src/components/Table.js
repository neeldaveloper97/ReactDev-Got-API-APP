import React, { useContext, useEffect } from "react";
import { Pagination } from "@material-ui/lab";
import { Button, Menu, MenuItem } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Link } from "react-router-dom";
import { ContextProvider } from "./AppContext";

function Table() {
  const [pageSize, setPageSize] = React.useState(null);
  const [gender, setGender] = React.useState("any");
  const [page, setPage] = React.useState(1);
  const [tableData, setTableData] = React.useState([]);
  const [contentVisible, setContentVisible] = React.useState(false);
  const [pagesizeFilterEl, setPageSizeFilterEl] = React.useState(null);
  const [genderFilterEl, setGenderFilterEl] = React.useState(null);
  
  

  useEffect(() => {
    setBackbutton(false);
    fetchAPI();
  }, [pageSize, gender, page]);

  /* API Management */

  const API = `https://www.anapioficeandfire.com/api/characters?pageSize=${pageSize}&gender=${gender}&page=${page}`;

  /*End API Management*/

  // Using Context to set Some Data
  const { setBackbutton } = useContext(ContextProvider);

  const handlePageSizeFilter = (event) => {
    setPageSizeFilterEl(event.currentTarget);
  };

  const handlePageSizeFilterClose = () => {
    setPageSizeFilterEl(null);
  };

  const handleGenderFilter = (event) => {
    setGenderFilterEl(event.currentTarget);
  };

  const handleGenderFilterClose = () => {
    setGenderFilterEl(null);
  };

  const fetchAPI = () => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setTableData(data);
      })
      .finally(() => {
        setContentVisible(true);
      });
  };

  return contentVisible ? (
    <div className="table-main">
      <div className="filter-area">
        <Button onClick={handlePageSizeFilter} startIcon={<FilterListIcon />}>
          Page Size
        </Button>
        <Button onClick={handleGenderFilter} startIcon={<FilterListIcon />}>
          Gender
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={pagesizeFilterEl}
          keepMounted
          open={Boolean(pagesizeFilterEl)}
          onClose={handlePageSizeFilterClose}
        >
          <MenuItem
            onClick={() => {
              setPageSize(10);
              setContentVisible(false);
              setPageSizeFilterEl(false);
            }}
          >
            10
          </MenuItem>
          <MenuItem
            onClick={() => {
              setPageSize(25);
              setContentVisible(false);
              setPageSizeFilterEl(false);
            }}
          >
            25
          </MenuItem>
          <MenuItem
            onClick={() => {
              setPageSize(50);
              setContentVisible(false);
              setPageSizeFilterEl(false);
            }}
          >
            50
          </MenuItem>
        </Menu>
        <Menu
          id="simple-menu"
          anchorEl={genderFilterEl}
          keepMounted
          open={Boolean(genderFilterEl)}
          onClose={handleGenderFilterClose}
        >
          <MenuItem
            onClick={() => {
              setGender("any");
              setContentVisible(false);
              setGenderFilterEl(false);
            }}
          >
            Any
          </MenuItem>
          <MenuItem
            onClick={() => {
              setGender("female");
              setContentVisible(false);
              setGenderFilterEl(false);
            }}
          >
            Female
          </MenuItem>
          <MenuItem
            onClick={() => {
              setGender("male");
              setContentVisible(false);
              setGenderFilterEl(false);
            }}
          >
            Male
          </MenuItem>
        </Menu>
      </div>
      <table className="table text-center">
        <thead>
          <tr className="bg-light">
            <th scope="col">Character</th>
            <th scope="col">Alive</th>
            <th scope="col">Gender</th>
            <th scope="col">Culture</th>
            <th scope="col">Allegiances</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => {
            return (
              <tr key={Math.random()}>
                <td>{item.name + " " + item.aliases}</td>
                <td>{item.born === "" ? "No" : "Yes"}</td>
                <td>{item.gender}</td>
                <td>{item.culture !== "" ? item.culture : "Unknown"}</td>
                <td>{getId(item.allegiances)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div
        className="pagination"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Pagination
          count={34}
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={(event, page) => {
            setPage(page);
            setContentVisible(false);
          }}
        />
      </div>
    </div>
  ) : (
    <div className="full-spinner-content">
      <div class="spinner-grow" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

function getId(strData) {
  let matches = strData.toString().match(/\d+/g);
  return matches ? (
    <Link to={{ pathname: "/houses", state: { id: matches } }}>
      {matches[0]}
    </Link>
  ) : (
    "No Allegiances"
  );
}

export default Table;
