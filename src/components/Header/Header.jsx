import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { BiMenu } from "react-icons/bi";
import { useContext, useEffect, useRef } from "react";
import { authContext } from "../../context/AuthContext";
const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(authContext);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
        headerRef.current.classList.add("sticky__header");
      }
      else {
        headerRef.current.classList.remove("sticky__header");
      }
    })
  }
  useEffect(() => {
    handleStickyHeader();
    return () => {
      window.removeEventListener("scroll", handleStickyHeader);
    }
  })


  const toggleMenu = () => { menuRef.current.classList.toggle("show__menu"); }


  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/*logo*/}
          <div>
            <img src={logo} alt="Medicare" />
          </div>

          {/* menu */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px]leading-7 font-[600]"
                        : "text-textColor text-[16px]leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* nav right */}
          <div className="flex items-center gap-4">

            {
              token && user  ?  <div >
                <Link to={`${role === "doctor" ? "/doctors/profile/me" : "/users/profile/me"}`}>
                  {user?.photo ? <figure className=" rounded-full cursor-pointer">
                    <img
                      className="w-[38px] h-[38px] object-cover rounded-full"
                      src={user?.photo}
                      alt="userImg"
                    />
                  </figure>: <p className="font-bold">{user.name}</p>}

                </Link>
              </div> : <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-semibold h-[44px] flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            }


            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer"></BiMenu>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
