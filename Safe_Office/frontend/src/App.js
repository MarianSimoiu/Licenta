import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import DeskBooking from "./screens/DeskBooking/DeskBooking";
import Test from "./screens/Test/test";
import MyBookings  from "./screens/MyBookings/MyBookings";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import SearchFriend from "./screens/SearchFriend/SearchFriend";
import RoomBooking from "./screens/RoomBooking/RoomBooking"
import Buildings from "./screens/Buildings/Buildings"
import BookForColleague from "./screens/BookForColleague/BookForColleague";
import TableBooking from "./screens/TableBooking/TableBooking";
import AddUser from "./screens/AddUser/AddUser";
import Requests from "./screens/Requests/Requests"

function App() {
  
  return (
    
    <Router>

      <Header/>
      <main className="App">
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/select_building/:kind" component={Buildings} />
        <Route path="/desk_booking/:id" component={DeskBooking} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/room_booking/:id" component={RoomBooking} />
        <Route path="/book_for_colleague/:id" component={BookForColleague} />
        <Route path="/table_booking/:id" component={TableBooking} />
        <Route path="/search_friend" component={SearchFriend} />
        <Route path="/my_bookings/:user" component={MyBookings} />
        <Route path="/add_user" component={AddUser} />
        <Route path="/requests" component={Requests} />
      </main> 
      <Footer />
    </Router>
  );
}

export default App;
