import logo from './logo.svg';
import './App.css';
import ListingJokes from './pages/ListingJokes';
import FavoritesList from './pages/FavoritesList';

function App() {
  return (
    <div className="App">
     <ListingJokes/>
     <FavoritesList/>
    </div>
  );
}

export default App;
