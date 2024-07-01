import PageTitle from "../components/PageTitle";
import GroupList from "../components/GroupList";
import Wheel from "../components/Wheel";
import IdeasLegend from "../components/IdeasLegend";
import { setUserGroups } from './../redux/loginSlice';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { db } from './../config/fireBaseConfig';
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

const HomePage = () => {

  const groupColletionRef = collection(db, 'Groups');
  const currentUserId = useSelector((state) => state.login.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUserId) {
      const unsub = getUserGroups();
      return () => {
        unsub();
      }
    }

  }, [currentUserId]);

  const getUserGroups = () => {
    const q = query(
      groupColletionRef,
      where('Users', 'array-contains', currentUserId)
    );

    let unsub = onSnapshot(q, (querySnapshot) => {
      console.log(currentUserId);
      console.log(querySnapshot.docs[0].data());
      //let data = [];
      //data = querySnapshot.docs[0].data();
      //data.id = querySnapshot.docs[0].id;
      //dispatch(setLogin());
    });
    return unsub;
  }

  return (
    <>
      <PageTitle value="HomePage" />
      <GroupList />
      <Wheel />
      <IdeasLegend />
    </>
  );
}

export default HomePage;
