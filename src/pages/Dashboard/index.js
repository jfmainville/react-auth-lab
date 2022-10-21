import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authActions";

const Dashboard = () => {
    const userEmailAddress = useSelector(state => state.auth.userEmailAddress);
    const dispatch = useDispatch();

    const onHandleLogout = async () => {
        const auth = getAuth();
        await signOut(auth);
        dispatch(logout());
    };

    return (
      <div className="App">
          <h1>Dashboard</h1>
          <h2>You are successfully authenticated as {userEmailAddress}</h2>
          <button onClick={onHandleLogout}>Logout</button>
      </div>
    );
};

export default Dashboard;