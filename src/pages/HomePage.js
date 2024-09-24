import PageTitle from "../components/PageTitle";
import CalendarPicker from "../components/calendar/CalendarPicker";
import GroupList from "../components/GroupList";
import Wheel from "../components/Wheel";
import IdeasLegend from "../components/IdeasLegend";
import { setUserGroups, setGroupIdeas } from './../redux/groupSlice';
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
  const IdeasColletionRef = collection(db, 'Ideas');
  const currentUserGroups = useSelector((state) => state.group.userGroups);
  const currentGroupIdeas = useSelector((state) => state.group.groupIdeas);
  const currentUserGroup = useSelector((state) => state.general.groupSelected);
  const currentUserMail = useSelector((state) => state.login.email);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUserGroup) {
      const unsub = getGroupIdeas();
      return () => {
        unsub();
      }
    }

  }, [currentUserGroup]);

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

  const getGroupIdeas = () => {
    const q = query(
      IdeasColletionRef,
      where('groupId', '==', currentUserGroup)
    );

    let unsub = onSnapshot(q, (querySnapshot) => {
      console.log(currentUserGroup);
      let data = [];
      querySnapshot.docs.forEach(doc => {
        let tmp = {};
        tmp = doc.data()
        tmp.id = doc.id;
        data.push(tmp);
      });
      dispatch(setGroupIdeas(data));
    });
    return unsub;
  }

  return (
    <>
      <PageTitle value="HomePage" />
      <GroupList groups={currentUserGroups}/>
      <CalendarPicker ideas={currentGroupIdeas}/>
      <Wheel />
      <IdeasLegend />
    </>
  );
}

export default HomePage;
