import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Tabs = ({ tab, setTab }) => {

    const {dispatch} = useContext(authContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    };


return (
    <div>
        <span className="lg:hidden">
            <BiMenu className="w-6 h-6 cursor-pointer" />
        </span>
        <div className=" lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md">
            <button
                onClick={() => setTab('overview')}
                className={`${tab === "overview"
                        ? "bg-indigo-100 text-primaryColor"
                        : "bg-transparent text-headingColor"
                    } w-full btn mt-0 rounded-md`}
            >
                Overview
            </button>

            <button
                onClick={() => setTab('appointments')}
                className={`${tab === "appointments"
                        ? "bg-indigo-100 text-primaryColor"
                        : "bg-transparent text-headingColor"
                    } w-full btn mt-0 rounded-md`}
            >
                Appointments
            </button>

            <button
                onClick={() => setTab('settings')}
                className={`${tab === "settings"
                        ? "bg-indigo-100 text-primaryColor"
                        : "bg-transparent text-headingColor"
                    } w-full btn mt-0 rounded-md`}
            >
                Profile
            </button>

            <div className="mt-[100px] w-full">
                <a
                    className="w-full block text-center bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white cursor-pointer" onClick={handleLogout}
                >
                    Log Out
                </a>
            </div>
        </div>
    </div>
);
}

export default Tabs;
