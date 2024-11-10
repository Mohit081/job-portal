import React, { useState } from "react";
import { Label } from "../ui/label";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utlis/constants";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl md:mx-auto">
        <form
          className=" md:w-1/2 border border-gray-200 rounded-md p-4 my-10"
          onSubmit={submitHandler}
        >
          <h1 className="font-bold text-xl mb-5 ">Login</h1>
          <div className="my-2">
            <Label className="pl-2">email</Label>
            <Input
              type="email"
              placeholder="Enter your full email here"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label className="pl-2">password</Label>
            <Input
              type="password"
              placeholder="Enter your password here"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="applicant"
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-one">applicant</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-two">recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="w-full my-4 ">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              login
            </Button>
          )}
          <span className="text-sm">
            don't have an account?
            <Link to="/signup" className="text-blue-600">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
