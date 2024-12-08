import { createSlice } from '@reduxjs/toolkit';
import { db } from './../config/fireBaseConfig';
import { updateDoc, doc } from 'firebase/firestore';

export const groupSlice = createSlice({
  name: 'group',
  initialState: {
    userGroups: [], // Gruppi a cui l'utente appartiene
    groupIdeasInSelectedDay: [], // Idee filtrate per giorno
    groupSelectedIdeas: [], // Idee del gruppo selezionato
    groupSelectedUsers: [], // Utenti del gruppo selezionato
  },
  reducers: {
    setUserGroups: (state, action) => {
      state.userGroups = action.payload;
    },
    setGroupIdeas: (state, action) => {
      state.groupSelectedIdeas = action.payload;
    },
    setGroupIdeasInSelectedDay: (state, action) => {
      state.groupIdeasInSelectedDay = action.payload;
    },
    setGroupSelectedUsers: (state, action) => {
      state.groupSelectedUsers = action.payload;
    },
    voteForIdea: (state, action) => {
      const { ideaId, userEmail, isChecked } = action.payload;

      // Trova l'idea corrispondente
      const idea = state.groupIdeasInSelectedDay.find((idea) => idea.id === ideaId);

      if (idea) {
        // Verifica se 'votes' è un array, altrimenti inizializzalo
        if (!Array.isArray(idea.votes)) {
          idea.votes = [];
        }

        // Aggiungi o rimuovi il voto dell'utente
        if (isChecked) {
          if (!idea.votes.includes(userEmail)) {
            idea.votes.push(userEmail);
          }
        } else {
          idea.votes = idea.votes.filter(vote => vote !== userEmail);
        }

        // Aggiorna Firestore con i nuovi voti
        const ideaRef = doc(db, "Ideas", ideaId);
        updateDoc(ideaRef, { votes: idea.votes })
          .then(() => console.log('Idea updated successfully in Firestore!'))
          .catch((error) => console.error('Error updating idea in Firestore:', error));
      }
    },
  },
});

export const { setUserGroups, setGroupIdeas, setGroupIdeasInSelectedDay, setGroupSelectedUsers, voteForIdea } = groupSlice.actions;
export default groupSlice.reducer;
