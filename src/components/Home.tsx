import Login from "./Login";
import Todo from "./todo";
import {useAppSelector} from "../redux/hooks/appHooks";

const Home = () => {
  const {loginState} = useAppSelector(state => state.login)
  if(!loginState.loggedIn)
    return <Login/>
  return <Todo/>
};

export default Home;
