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
  const currentUser = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserGroups();
  }, []);

  const getUserGroups = () => {
    const q = query(
      groupColletionRef,
      where('Users', 'array-contains', currentUser.id)
    );

    const unsub = onSnapshot(q, (querySnapshot) => {
      console.log(currentUser);
      console.log(querySnapshot.docs[0].data());
      //var data = [];
      //data = querySnapshot.docs[0].data();
      //data.id = querySnapshot.docs[0].id;
      //dispatch(setLogin(data));
    });
    return () => {
      unsub();
    };
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
