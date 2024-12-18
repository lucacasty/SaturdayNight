import IdeasList from "../components/IdeasList";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAllIdeas, setAllIdeasUsers } from '../redux/homeSlice';
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
  getDoc,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';


const HomePage = () => {

  const dispatch = useDispatch();

  const homeSlice = useSelector((state) => state.home);
  const IdeasColletionRef = collection(db, 'Ideas');

  useEffect(() => {
    const unsub = getAllIdeas();
    return () => {
      unsub();
    }
  }, []);

  const getAllIdeas = () => {
    const q = query(
      IdeasColletionRef
    );

    let unsub = onSnapshot(q, (querySnapshot) => {
      let data = [];
      let userIds = [];
      querySnapshot.docs.forEach(doc => {
        let tmp = {};
        tmp = doc.data()
        tmp.id = doc.id;
        data.push(tmp);
        if (!userIds.includes(tmp.userId)) {
          userIds.push(tmp.userId);
        }
      });
      dispatch(setAllIdeas(data));
      getAllIdeasUsers(userIds);
    });
    return unsub;
  }

  const getAllIdeasUsers = async (userIds) => {

    const data = [];

    for (const id of userIds) {
      const docRef = doc(db, 'Users', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        data.push({ id: docSnap.id, ...docSnap.data() });
      }
    }
    
    dispatch(setAllIdeasUsers(data));
  }

  return (
    <>
      {/*<PageTitle value="HomePage" />*/}
      <IdeasList ideas={homeSlice.allIdeas} users={homeSlice.allIdeasUsers}/>
    </>
  );
}

export default HomePage;
