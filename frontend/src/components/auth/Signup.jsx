import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utlis/constants";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import store from "../redux/store.js";
import { setLoading } from "../redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();
const {loading} = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.data.message);
      }
    } catch (error) {
      console.log("error in signup" , error , error.response );
      toast.error(error.response.data);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <div className="">
        <Navbar />
        <div className="flex items-center justify-center max-w-7xl md:mx-auto">
          <form
            className="md:w-1/2 border border-gray-200 rounded-md p-4 my-10 "
            onSubmit={submitHandler}
          >
            <h1 className="font-bold text-xl mb-5 ">Signup</h1>
            <div className="my-2">
              <Label className="pl-2">Full Name</Label>
              <Input
                type="text"
                placeholder="Enter your full Name here"
                value={input.fullName}
                name="fullName"
                onChange={changeEventHandler}
              />
            </div>
            <div className="my-2">
              <Label className="pl-2">Email</Label>
              <Input
                type="email"
                placeholder="Enter your email here"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
              />
            </div>
            <div className="my-2">
              <Label className="pl-2">Phone Number</Label>
              <Input
                type="tel"
                placeholder="Enter your phoneNumber here"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
              />
            </div>
            <div className="my-2">
              <Label className="pl-2">Password</Label>
              <Input
                type="password"
                placeholder="Enter your password here"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
              />
            </div>
            <div className=" md:flex items-center justify-between">
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
              <div className="flex items-center gap-2">
                <Label>Profile</Label>
                <Input
                  type="file"
                  accept="image/*0"
                  onChange={changeFileHandler}
                  className="cursor-pointer"
                />
              </div>
            </div>
            { loading ? (
              <Button className="w-full my-4 ">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Signup
              </Button>
            )}
            <span className="text-sm">
              already have an account?
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
