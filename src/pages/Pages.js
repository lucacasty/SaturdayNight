import HomePage from './HomePage';
import Modal from '../components/Modal';
import BottomNavigator from '../components/BottomNavigator';
import { useSelector, useDispatch } from 'react-redux';
import GroupPage from './GroupPage';
import AddIdeaPage from './AddIdeaPage';
import HistoryPage from './HistoryPage';
import ProfilePage from './ProfilePage';
import { setLogin } from '../redux/loginSlice';
import { closeAllModals } from '../redux/generalSlice';
import { addIdea } from '../redux/ideaSlice';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { collection,getDocs,query,where} from 'firebase/firestore';
import { db,auth } from '../config/fireBaseConfig';

function Pages() {

  const generalSettings = useSelector((state) => state.general);
  const dispatch = useDispatch();

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const [ideaName, setIdeaName] = useState("");
  const [ideaDescription, setIdeaDescription] = useState("");
  const [groupName, setGroupName] = useState("");

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "Users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      dispatch(setLogin(data));
    } catch (err) {
      console.error(err);
      console.log("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  const handleModalClose = () => {
    dispatch(closeAllModals());
  };

  const handleSubmitIdea = () => {
    //TODO: add checks
    const idea = { name: ideaName, description: ideaDescription, groupId: generalSettings.groupSelected, date: generalSettings.selectedDay};
    console.log("New Idea:", idea);
    dispatch(addIdea(idea));
    setIdeaName('');
    setIdeaDescription('');
    handleModalClose();
  };

  const handleSubmitGroup = () => {
    //TODO: add checks
    const group = { name: groupName };
    console.log("New Group Created:", group);
    setGroupName('');
  };

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

      <Modal isOpen={generalSettings.modalIdeaOpen} onClose={handleModalClose}>
        <>
          <h2>Create a new idea</h2>
          <input
            type="text"
            placeholder="Idea name"
            value={ideaName}
            onChange={(e) => setIdeaName(e.target.value)} // Update state
          />
          <textarea
            placeholder="Idea description"
            value={ideaDescription}
            onChange={(e) => setIdeaDescription(e.target.value)} // Update state
          ></textarea>
          <button onClick={handleSubmitIdea}>Create Idea</button>
        </>
      </Modal>

      <Modal isOpen={generalSettings.modalGroupOpen} onClose={handleModalClose}>
        <>
          <h2>Create a new group</h2>
          <input
            type="text"
            placeholder="Group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)} // Update state
          />
          <button onClick={handleSubmitGroup}>Create Group</button>
        </>
      </Modal>
    </>
  );
}

export default Pages;
