import React,{useState} from "react";
import "./layout.css";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/NavBar/Nav";
import Loader from "../../components/Loader/Loader";
const Layout = ({ children, setUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  


  // const { loginLoading, recoverPassLoading, resetPassLoading } = useSelector(
  //   state => state.authentication,
  // );
  // const { cartLoading, favoriteLoading, teamsLoading } = useSelector(
  //   state => state.teams,
  // );
  // const { getUserLoading } = useSelector(state => state.user);
  // const { registerLoading } = useSelector(state => state.registration);
  // const load =
  //   registerLoading ||
  //   getUserLoading ||
  //   loginLoading ||
  //   recoverPassLoading ||
  //   resetPassLoading ||
  //   cartLoading ||
  //   favoriteLoading ||
  //   teamsLoading;
  return (
    <div>
      <Nav setUser={setUser} />
      {isLoading && <Loader />}
      <div className="children-container">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
