import MainMenu from "../../components/MainMenu"
import { useSelector } from "react-redux";

function SearchFriend() {

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    return( 
        <div>
            <MainMenu uInfo={userInfo}></MainMenu>
        </div>
        
    )
}

export default SearchFriend