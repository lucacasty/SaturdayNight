import Post from './post/Post';
import { useSelector } from 'react-redux';
import './IdeasList.css';

const IdeasList = ({ ideas }) => {

  const loginSlice = useSelector((state) => state.login);

  return (
    <>
      {ideas.map((idea) => (
        <Post
          profilePic={loginSlice.profilePic}
          userId={idea.userId}
          name={idea.name}
          desc={idea.description}
          img=""
        />
      ))}
    </>
  );
};

export default IdeasList;
