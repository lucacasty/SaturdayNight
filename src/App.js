import './App.css';
import HomePage from './pages/HomePage';
import BottomNavigator from './components/BottomNavigator';
import { useSelector, useDispatch } from 'react-redux';
import GroupPage from './pages/GroupPage';
import AddIdeaPage from './pages/AddIdeaPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import { setLogin, fetchUserByMail } from './redux/loginSlice';
import React, { useEffect } from 'react';

function App() {

  const generalSettings = useSelector((state) => state.general);
  const dispatch = useDispatch();

   
  useEffect(() => {
    getCurrentUser();  //fake login
  }, []);

  const getCurrentUser = () => {
    dispatch(fetchUserByMail('luca.castelli02@gmail.com'));
  }

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
