import './App.css';
import {Route} from 'react-router-dom'
import Loading from './components/Containers/loading';
import Home from './components/Containers/home';
import CountryDetails from './components/Containers/detail'
import Nav from './components/Containers/nav'
import activity from './components/Containers/activity';



function App() {
  // var dispatch = useDispatch()
  // useEffect(function(){
  // dispatch(getCountries())
  // },[dispatch])
  // function onSearch(pais){
  //   fetch(`http://localhost:3001/countries?name=${pais}`)
  //   .then(r => r.json())
  //   .then(resp => {
  //     if(resp == undefined){
  //       return 'No se encontró el pais'
  //     } else return resp;
  //   })
  // }
  return (
    <div className="App">
      <Route
      exact
      path='/'
      component={Loading}
      />
      <Route 
      path='/home'
      component={Nav}
      />
      <Route 
      exact
      path='/home'
      component= {Home}
      />
      <Route
        path="/country/:id"
        render={({ match }) => {
          return <CountryDetails id={match.params.id} />;
        }}
      />
      <Route 
      path='/createdActivity'
      component= {activity}
      />
    </div>
  );
}

export default App;
