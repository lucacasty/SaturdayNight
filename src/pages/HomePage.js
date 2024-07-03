import PageTitle from "../components/PageTitle";
import GroupList from "../components/GroupList";
import Wheel from "../components/Wheel";
import IdeasLegend from "../components/IdeasLegend";
import { setUserGroups } from './../redux/groupSlice';
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
  const currentUserGroups = useSelector((state) => state.group.userGroups);
  const currentUserMail = useSelector((state) => state.login.email);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUserMail) {
      const unsub = getUserGroups();
      return () => {
        unsub();
      }
    }

  }, [currentUserMail]);

  const getUserGroups = () => {
    const q = query(
      groupColletionRef,
      where('users', 'array-contains', currentUserMail)
    );

    let unsub = onSnapshot(q, (querySnapshot) => {
      console.log(currentUserMail);
      let data = [];
      querySnapshot.docs.forEach(doc => {
        let tmp = {};
        tmp = doc.data()
        tmp.id = doc.id;
        data.push(tmp);
      });
      dispatch(setUserGroups(data));
    });
    return unsub;
  }

  return (
    <>
      <PageTitle value="HomePage" />
      <GroupList groups={currentUserGroups}/>
      <Wheel />
      <IdeasLegend />
    </>
  );
}

export default HomePage;
