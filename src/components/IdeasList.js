import Post from './post/Post';
import { useSelector } from 'react-redux';
import './IdeasList.css';

const IdeasList = ({ ideas, users }) => {
  return (
    <>
      {ideas.map((idea) => {
        // Filter the user by ID
        const user = users.find(user => user.id === idea.userId);

        // If the user does not exist (for example, if the ID is not found), you can handle this situation
        if (!user) {
          return null; // You can decide what to do if the user is not found
        }

        // Render the Post component with the user's information
        return (
          <Post
            key={idea.id}  // Make sure to add a unique key
            profilePic={user.profilePic}
            userId={idea.userId}
            name={user.name}  // Use the name of the found user
            desc={idea.description}
            img=""
          />
        );
      })}
    </>
  );
};

export default IdeasList;
