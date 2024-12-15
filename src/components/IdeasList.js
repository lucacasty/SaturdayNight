import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteForIdea } from '../redux/groupSlice'; // Thunk per caricare gli utenti
import Checkbox from '@mui/material/Checkbox';
import { setIdeaModalState } from '../redux/generalSlice';
import './IdeasList.css';

const IdeasList = ({ ideas }) => {
  const dispatch = useDispatch();
  const selectedGroupUsers = useSelector((state) => state.group.selectedGroupUsers);
  const groupIdeasInSelectedDay = useSelector((state) => state.group.groupIdeasInSelectedDay);
  const userEmail = useSelector((state) => state.login.email);

  const [checkedValues, setCheckedValues] = useState({});

  useEffect(() => {
    // Inizializza lo stato con le checkbox selezionate (se l'utente ha già votato)
    const initialCheckedValues = {};
    ideas.forEach((idea) => {
      initialCheckedValues[idea.id] = idea.votes.includes(userEmail);
    });
    setCheckedValues(initialCheckedValues);
  }, [ideas, userEmail]);

  const handleVote = (ideaId, userEmail, isChecked) => {
    dispatch(voteForIdea({ ideaId, userEmail, isChecked }));

    // Aggiorna lo stato delle checkbox
    setCheckedValues((prev) => ({
      ...prev,
      [ideaId]: isChecked,
    }));
  };

  const handleAddIdea = () => {
    dispatch(setIdeaModalState(true));
  };

  return (
    <div className="ideas-table">
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Idea</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {selectedGroupUsers.map((user) => {
            const userIdea = groupIdeasInSelectedDay.find((idea) => idea.userId === user.id);

            return (
              <tr key={user.id}>
                <td>{user.name || user.email}</td>
                <td>{userIdea ? userIdea.name : ''}</td>
                <td>
                  {userIdea ? (
                    ''
                  ) : user.email === userEmail ? (
                    <button onClick={() => handleAddIdea()}>+</button>
                  ) : (
                    <Checkbox
                      checked={userIdea?.votes?.includes(userEmail)}
                      onChange={() => handleVote(userIdea?.id)}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default IdeasList;
