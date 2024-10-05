import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import Login from "../auth/Login";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utlis/constants";
import { setUser } from "../redux/authSlice";
import { toast } from "sonner";
import axios from "axios";
import { AlignJustifyIcon, BoxIcon, Layers3, LogIn, LogOut, User2 } from "lucide-react";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);


  const [value, setvalue] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Shop</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className=" hidden md:flex font-medium items-center gap-5 ">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <Button
              className=" flex md:hidden bg-slate-100 h-7 w-12 mr-7 text-black hover:text-white"
              onClick={() => {
                if (value == null) {
                  setvalue(1);
                } else {
                  setvalue(null);
                }
              }}
            >
              <AlignJustifyIcon />
            </Button>
          ) : (
            <a href="/jobs" className="flex md:hidden text-lg gap-2 pl-10">
              <Layers3 />
            </a>
          )}

          {!user ? (
            <div className=" hidden md:flex items-center gap-2 ">
              <Link to="/login">
                <Button variant="outline" className="hover:text-white">
                  login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  variant="outline"
                  className="bg-black  text-white hover:text-black hover:bg-white"
                >
                  signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage
                    src={
                      user.profile.profilePhoto
                        ? user?.profile?.profilePhoto
                        : "../../public/avatar.avif"
                    }
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-5 space-y-2">
                  <Avatar>
                    <AvatarImage
                      src={
                        user.profile.profilePhoto
                          ? user?.profile?.profilePhoto
                          : "../../public/avatar.avif"
                      }
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  {user && user.role === "applicant" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link">
                        {" "}
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}

                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
      <div className="flex justify-center bg-slate-100 text-[#6A38C2] t">
        {value == 1 && (
          <ul className="  md:hidden font-medium items-center gap-5 py-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
                {!user && (
                  <ul>
                    <li>
                      <Link to="/login"> login</Link>
                    </li>
                    <li>
                      <Link to="/signup"> signup</Link>
                    </li>
                  </ul>
                )}
              </>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
