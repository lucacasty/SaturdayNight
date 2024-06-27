import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage';
import BottomNavigator from './components/BottomNavigator';
import { useSelector, useDispatch } from 'react-redux'
import GroupPage from './pages/GroupPage';
import AddIdeaPage from './pages/AddIdeaPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import { setUser } from './redux/userSlice';
import React, { useState, useEffect } from 'react';
import { db } from './config/fireBaseConfig';
import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';

function App() {

  const userColletionRef = collection(db, 'Users')
  const generalSettings = useSelector((state) => state.general)
  const currentUser = useSelector((state) => state.user)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

   //REALTIME GET FUNCTION
   useEffect(() => {
    const q = query(
      userColletionRef,
      //  where('owner', '==', currentUserId),
      where('mail', '==', 'luca.castelli02@gmail.com'), // does not need index
      //  where('score', '<=', 100) // needs index  https://firebase.google.com/docs/firestore/query-data/indexing?authuser=1&hl=en
      // orderBy('score', 'asc'), // be aware of limitations: https://firebase.google.com/docs/firestore/query-data/order-limit-data#limitations
      limit(1)
    );

    setLoading(true);
    // const unsub = onSnapshot(q, (querySnapshot) => {
    const unsub = onSnapshot(q, (querySnapshot) => {
      console.log(querySnapshot.docs[0].data());
      dispatch(setUser(querySnapshot.docs[0].data()));
      setLoading(false);
    });
    return () => {
      unsub();
    };

    // eslint-disable-next-line
  }, []);

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
