import "./componentStyle.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HouseDetails from "./HouseDetails";
import Table from "./Table";

const Routing = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Table} />
        <Route path="/houses" component={HouseDetails} />
      </Switch>
    </Router>
  );
};


export default Routing;
