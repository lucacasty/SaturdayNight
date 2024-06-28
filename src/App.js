import './App.css';
import HomePage from './pages/HomePage';
import BottomNavigator from './components/BottomNavigator';
import { useSelector, useDispatch } from 'react-redux';
import GroupPage from './pages/GroupPage';
import AddIdeaPage from './pages/AddIdeaPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import { setLogin } from './redux/loginSlice';
import React, { useEffect } from 'react';
import { db } from './config/fireBaseConfig';
import { onSnapshot, collection, query, where, limit} from 'firebase/firestore';

function App() {

  const userColletionRef = collection(db, 'Users');
  const generalSettings = useSelector((state) => state.general);
  const dispatch = useDispatch();

   
  useEffect(() => {
    getCurrentUser();   //fake login
  }, []);

  const getCurrentUser = () => {
    const q = query(
      userColletionRef,
      where('mail', '==', 'luca.castelli02@gmail.com'),
      limit(1)
    );

    // const unsub = onSnapshot(q, (querySnapshot) => {
    const unsub = onSnapshot(q, (querySnapshot) => {
      console.log(querySnapshot.docs[0].data());
      var data = [];
      data = querySnapshot.docs[0].data();
      data.id = querySnapshot.docs[0].id;
      dispatch(setLogin(data));
    });
    return () => {
      unsub();
    };
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
