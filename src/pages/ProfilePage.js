import PageTitle from "../components/PageTitle";
import { logout } from "../config/fireBaseConfig";

const ProfilePage = () => {

  const userLogout = () => {
    localStorage.clear();
    logout();
  }

  return (
    <>
      <PageTitle value="Profile Page" />
      <button onClick={userLogout}>LOGOUT</button>
    </>
  );
}

export default ProfilePage;
