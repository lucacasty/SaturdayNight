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
      let data = [];
      querySnapshot.forEach(doc => {
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
