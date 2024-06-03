import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage';
import { useSelector, useDispatch } from 'react-redux'
import { changePage } from './redux/generalSlice'

function App() {

  const generalSettings = useSelector((state) => state.general)
  const dispatch = useDispatch()

  return (
    <>
      {
        generalSettings.page == 1 &&
        <HomePage />
      }
      {
        generalSettings.page == 2 &&
        <HomePage />
      }
      {
        generalSettings.page == 3 &&
        <HomePage />
      }
    </>
  );
}

export default App;
