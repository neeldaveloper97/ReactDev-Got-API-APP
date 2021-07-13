import './App.css';
import Appbar from './components/Appbar';
import AppContext from './components/AppContext';
import Routing from './components/Routing';


const App = () =>{
   return(
     <AppContext>
        <Appbar/>
        <Routing/>
     </AppContext>
   )
}

export default App;
