
import './App.css';
import Home from './Components/Home';
import Tenants from './Components/Tenants';
import {Route,Switch} from 'react-router-dom'
function App() {
  

/*flow of program files visit the code in below given order 
1: home.js
2: Header.js
3: PropertyCards.js
4: Tenants.js
5: Footer.js
*/

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Tenants" component={Tenants} />
      </Switch>
    </div>
  );
}

export default App;
