import home from "../assets/img1.png";
import about from "../assets/img2.png";
import blog from "../assets/img3.png";
import art from "../assets/img4.png";
import cats from "../assets/cats.webp";

import { useLocation, Link } from "react-router-dom";

const Navigation = () => {
    const location = useLocation();

    return (
        <aside className="mb-auto lg:w-[339px] bg-blue-100 border border-blue-300 rounded-xl shadow-md opacity-90">
            <nav className="space-y-2 mb-4">
              <h2 className="text-blue-600 font-bold text-lg text-center p-4">site navigation</h2>
              <ul>
                <div className="flex justify-center">
                  <img className="h-4 w-4" src={home}/>
                  <Link className="hover:animate-wiggle hover:underline" to="/">
                    <li className={location.pathname === "/" ? "text-blue-700 pl-1 text-sm text-center font-bold cursor-pointer" : "text-blue-500 pl-1 text-sm text-center font-bold cursor-pointer"}>home</li>
                  </Link>       
                </div>
                <div className="flex justify-center"> 
                  <img className="h-4 w-4" src={about}/>
                  <Link className="hover:animate-wiggle hover:underline" to="/about">
                    <li className={location.pathname === "/about" ? "text-blue-700 pl-1 text-sm text-center font-bold cursor-pointer" : "text-blue-500 pl-1 text-sm text-center font-bold cursor-pointer"}>about</li>
                  </Link>
                </div>
                <div className="flex justify-center">
                  <img className="h-4 w-4" src={blog}/>
                  <Link className="hover:animate-wiggle hover:underline" to="/blog">
                    <li className={location.pathname === "/blog" ? "text-blue-700 pl-1 text-sm text-center font-bold cursor-pointer" : "text-blue-500 pl-1 text-sm text-center font-bold cursor-pointer"}>blog</li>
                  </Link>       
                </div>
                <div className="flex justify-center">
                  <img className="h-4 w-4" src={art}/>
                  <Link className="hover:animate-wiggle hover:underline" to="/art">
                    <li className={location.pathname === "/art" ? "text-blue-700 pl-1 text-sm text-center font-bold cursor-pointer" : "text-blue-500 pl-1 text-sm text-center font-bold cursor-pointer"}>art</li>
                  </Link>             
                </div>
                <div className="flex justify-center">
                  <img className="h-4 w-4" src={cats}/>
                  <Link className="hover:animate-wiggle hover:underline" to="/cats">
                    <li className={location.pathname === "/cats" ? "text-blue-700 pl-1 text-sm text-center font-bold cursor-pointer" : "text-blue-500 pl-1 text-sm text-center font-bold cursor-pointer"}>cats</li>
                  </Link>             
                </div>
                <li className="text-sm text-center font-bold text-blue-500">another page (maybe)</li>
              </ul>
            </nav>
          </aside>
    )
}

export default Navigation;