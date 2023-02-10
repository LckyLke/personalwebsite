// pages/login.tsx

import React, { useState } from "react";
import Router from "next/router";
import axios from "axios";
import { useUserStore } from "../components/store";

const login: React.FC = () => {
  const [name, setName] = useState("");

  const setUserName = useUserStore((state) => state.setUserName);
  const setUserRatings = useUserStore((state) => state.setUserRatings);
  const ratings = useUserStore((state) => state.ratings);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/users", {
        name,
      });
      if (response.status === 200) {
        setUserName(name);
        setUserRatings(response.data[0].ratings);
        console.log("respone ratings" + response.data[0].ratings);
        console.log("ratings: " + ratings);
        console.log("User ratings: " + response.data.ratings);
        Router.push("/learncards");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="w-full max-w-sm" onSubmit={handleSubmit}>
      <div className="mb-6 md:flex md:items-center">
        <div className="md:w-1/3">
          <label className="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0">
            Name
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            type="text"
            className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button
            className="px-4 py-2 font-bold text-white bg-purple-500 rounded shadow hover:bg-purple-400 focus:shadow-outline focus:outline-none"
            type="submit"
          >
            Login
          </button>
          <button
            className="px-4 py-2 mx-4 font-bold text-white bg-purple-500 rounded shadow hover:bg-purple-400 focus:shadow-outline focus:outline-none"
            onClick={(e) => {
              console.log("User name: " + name);
            }}
          >
            Print User
          </button>
        </div>
      </div>
    </form>
  );
};

export default login;
