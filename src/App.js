import Header from "./Components/Header/Header";
import './App.css'
import SimpleBottomNavigation from "./Components/Main/MainNav";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Trending from "./Components/Pages/Trending";
import Movies from "./Components/Pages/Movies";
import Series from "./Components/Pages/Series";
import Search from "./Components/Pages/Search";
import { Container } from "@material-ui/core";
import ShowDetails from "./Components/Pages/ShowDetails";
import Newsletter from "./Components/Pages/Newsletter";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className='app'>
        <Container>
          <Switch>
            <Route path='/' component = {Trending} exact />
            <Route path='/movies' component = {Movies} />
            <Route path='/series' component = {Series} />
            <Route path='/search' component = {Search} />
            <Route path='/:type/:id' component = {ShowDetails} />
            <Route path='/newsletter' component = {Newsletter} />
          </Switch>
        </Container>  
      </div>  
      <SimpleBottomNavigation />

    </BrowserRouter>
  );
}

export default App;