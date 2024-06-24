import PageTitle from "../components/PageTitle";
import GroupList from "../components/GroupList";
import Wheel from "../components/Wheel";
import IdeasLegend from "../components/IdeasLegend";

const HomePage = () => {
  return (
    <>
      <PageTitle value="HOMEPAGE" />
      <GroupList />
      <Wheel />
      <IdeasLegend />
    </>
  );
}

export default HomePage;
