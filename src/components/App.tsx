import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from "./Home"
import NotFound from "./NotFound"
import store from "../redux/store"
import {Provider} from 'react-redux'
import '../styles/index.scss'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/" component={NotFound}/>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
