import DateComponent from "../components/Date";
import CalendarPicker from "../components/CalendarPicker";
import GroupList from "../components/GroupList";
import IdeasList from "../components/IdeasList";
import IdeasLegend from "../components/IdeasLegend";
import { db } from './../config/fireBaseConfig';
import dayjs from 'dayjs';
import { changeSelectedDay } from '../redux/generalSlice';
import { setUserGroups, setGroupIdeas, setSelectedGroupUsers } from './../redux/groupSlice';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
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

const GroupPage = () => {

  var currentGroupUsers = [];
  const groupColletionRef = collection(db, 'Groups');
  const IdeasColletionRef = collection(db, 'Ideas');
  const UsersColletionRef = collection(db, 'Users');
  const currentUserGroups = useSelector((state) => state.group.userGroups);
  const currentGroupIdeas = useSelector((state) => state.group.selectedGroupIdeas);
  const currentUserGroupId = useSelector((state) => state.general.groupSelected);
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
    if (currentUserMail) {
      const unsub = getUserGroups();
      return () => {
        unsub();
      }
    }

  }, [currentUserMail]);

  useEffect(() => {
    if (currentUserGroupId) {
      const unsub = getGroupIdeas();
      return () => {
        unsub();
      }
    }

  }, [currentUserGroupId]);

  useEffect(() => {
    if (currentUserGroups) {
      const currentGroup = currentUserGroups.filter(function(element){
        return element.id == currentUserGroupId;
      });
      if(currentGroup!== undefined && currentGroup.length > 0) {
        currentGroupUsers = currentGroup[0]['users'];
      }
      if(currentGroupUsers!== undefined && currentGroupUsers.length > 0) {
        const unsub = getCurrentGroupUsers(currentGroupUsers);
        return () => {
          unsub();
        }
      }
    }

  }, [currentUserGroups, currentUserGroupId]);

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
      where('groupId', '==', currentUserGroupId)
    );

    let unsub = onSnapshot(q, (querySnapshot) => {
      console.log(currentUserGroupId);
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

  // Getting informations of users in the group selected
  const getCurrentGroupUsers = (currentGroupUsers) => { 

    const q = query(
      UsersColletionRef,
      where('email', 'in', currentGroupUsers)
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
      dispatch(setSelectedGroupUsers(data));
    });
    return unsub;
  }

  return (
    <>
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

export default GroupPage;
