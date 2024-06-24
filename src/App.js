import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage';
import BottomNavigator from './components/BottomNavigator';
import { useSelector, useDispatch } from 'react-redux'
import GroupPage from './pages/GroupPage';
import AddIdeaPage from './pages/AddIdeaPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';

function App() {

  const generalSettings = useSelector((state) => state.general)

  return (
    <>
      {
        generalSettings.page == 0 &&
        <HomePage />
      }
      {
        generalSettings.page == 1 &&
        <GroupPage />
      }
      {
        generalSettings.page == 2 &&
        <AddIdeaPage />
      }
      {
        generalSettings.page == 3 &&
        <HistoryPage />
      }
      {
        generalSettings.page == 4 &&
        <ProfilePage />
      }
      <BottomNavigator />
    </>
  );
}

export default App;
