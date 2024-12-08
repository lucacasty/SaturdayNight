import DateComponent from "../components/Date";
import CalendarPicker from "../components/CalendarPicker";
import GroupList from "../components/GroupList";
import IdeasList from "../components/IdeasList";
import IdeasLegend from "../components/IdeasLegend";
import { setUserGroups, setGroupIdeas, setGroupSelectedUsers } from './../redux/groupSlice';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { db } from './../config/fireBaseConfig';
import dayjs from 'dayjs';
import { changeSelectedDay } from '../redux/generalSlice';
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
  const currentGroupIdeas = useSelector((state) => state.group.groupSelectedIdeas);
  const currentUserGroup = useSelector((state) => state.general.groupSelected);
  const currentUserMail = useSelector((state) => state.login.email);
  const calendarShown = useSelector((state) => state.general.calendarShown);
  const selectedDay = useSelector((state) => state.general.selectedDay);
  const ideasForSelectedDay = useSelector((state) => state.group.groupIdeasInSelectedDay);
  const dispatch = useDispatch();

  if(selectedDay == null) {
    let date = dayjs(new Date());
    let value = date.year() + '-' + ('0'+(date.month()+1)).slice(-2) + '-' + ('0'+date.date()).slice(-2);
    dispatch(changeSelectedDay(value));
  }
  

  useEffect(() => {
    if (currentUserGroup) {
      const unsub = getGroupIdeas();
      return () => {
        unsub();
      }
    }

  }, [currentUserGroup]);

  useEffect(() => {
    if (currentUserGroup) {
      const unsub = getGroupUsers();
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
  
  const getGroupUsers = () => {
    const groupRef = doc(db, 'Groups', currentUserGroup); // Assicurati che sia il doc giusto
    let unsub = onSnapshot(groupRef, (docSnapshot) => {
      const data = docSnapshot.data();
      if (data && data.users) {
        const users = data.users.map(userMail => ({
          name: userMail,
        }));
        dispatch(setGroupSelectedUsers(users));
      }
    });
    return unsub;
  }

  return (
    <>
      {/*<PageTitle value="HomePage" />*/}
      <GroupList groups={currentUserGroups}/>
      <DateComponent day={selectedDay}/>
      {calendarShown && (
        <CalendarPicker ideas={currentGroupIdeas}/>
      )}
      {!calendarShown && (
        <IdeasList ideas={ideasForSelectedDay}/>
      )}
      <IdeasLegend />
    </>
  );
}

export default HomePage;
