import './App.css';
import HomePage from './HomePage';
import BottomNavigator from '../components/BottomNavigator';
import { useSelector, useDispatch } from 'react-redux';
import GroupPage from './GroupPage';
import AddIdeaPage from './AddIdeaPage';
import HistoryPage from './HistoryPage';
import ProfilePage from './ProfilePage';
import { setLogin, fetchUserByMail } from '../redux/loginSlice';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import React, { useEffect,useState } from 'react';
import { collection,getDocs,query,where} from 'firebase/firestore';
import { db,auth } from '../config/fireBaseConfig';

function Pages() {

  const generalSettings = useSelector((state) => state.general);
  const dispatch = useDispatch();

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

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

export default Pages;
