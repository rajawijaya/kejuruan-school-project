import {
  useState,
  useEffect,
  useRef
} from "react";
import ReactDom from "react-dom/client";

const NavBar = () => {
  const [navbarActive,
    setNavbarActive] = useState(false);

  return (
    <>
    <nav class="w-full h-[60px] bg-sky-900 text-white flex justify-around items-center bg-sky-900 font-bold text-xl">
    <div class="navbar-title">
          <h3>Kejuruan Schools</h3>
    </div>
    <ul class={navbarActive ? "absolute top-[60px] transition z-[-1] h-auto w-full bg-sky-900 p-5 pl-10 leading-10 sm:flex sm:w-1/3 sm:justify-around sm:static sm:z-[0] sm:translate-y-[0] sm:h-[60px] sm:items-center": "absolute top-[60px] translate-y-[-200px] z-[-1] transition h-auto w-full bg-sky-900 p-5 pl-10 leading-10 sm:flex sm:w-1/3 sm:justify-around sm:static sm:z-[0] sm:translate-y-[0] sm:h-[60px] sm:items-center"}>
          <li>home</li>
          <li>blog</li>
          <li>contact</li>
    </ul>
    <div onClick={() => setNavbarActive(!navbarActive)} class="hamburger-menu sm:hidden w-[44px] h-[44px] flex flex-col justify-around">
          <span class="w-full h-[5px] rounded bg-white"></span>
          <span class="w-full h-[5px] rounded bg-white"></span>
          <span class="w-full h-[5px] rounded bg-white"></span>
    </div>
    </nav> 
    </>
  )
}

export default NavBar;