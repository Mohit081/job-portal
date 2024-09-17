import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new formData();
  };

  return (
    <>
      <div className="">
        <Navbar />
        <div className="flex items-center justify-center max-w-7xl mx-auto">
          <form
            className="w-1/2 border border-gray-200 rounded-md p-4 my-10 "
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
                type="text"
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
                    value="apllicant"
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
                <Input type="file" />
              </div>
            </div>
            <Button type="submit" className="w-full my-4">
              Signup
            </Button>
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
