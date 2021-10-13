import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from "./Home";
import NotFound from "./NotFound";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/" component={NotFound}/>
      </Switch>
    </Router>
  );
};

export default App;
