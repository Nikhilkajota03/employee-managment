import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import Navbar from "../page/Navbar.js";

const Attendance = () => {
  const [allstudents, setStudents] = useState([]);

  useEffect(() => {
    const getStudent = async () => {
      const token = localStorage.getItem("jwt");
      try {
        const getstudents = await axios.get(
          "http://localhost:8000/api/v1/user/getUser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStudents(getstudents.data);
      } catch (error) {
        console.log(error);
      }
    };

    getStudent();
  }, []);

  return (
    <>
      <Navbar />
      <div class="text-gray-900 bg-gray-200">
        <div class="p-11 flex justify-center">
          <h1 class="text-3xl font-bold">Users</h1>
        </div>

        <div class="px-3 py-4 flex justify-center">
          <table class="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
              <tr class="border-b">
                <th class="text-center p-3 relative  ">S.No</th>
                <th class="text-center p-3 relative left-[6rem] ">Name</th>
                <th class="text-center p-3 relative left-[6rem] ">DOB</th>
                <th class="text-center p-3 relative left-[5.3rem] ">Email</th>
              </tr>
              {allstudents.length === 0 ? (
                <div className="p-5 text-red">No employee added</div>
              ) : (
                allstudents.map((value, index) => (
                  <tr class="border-b hover:bg-orange-100 bg-gray-100">
                    <td class="p-3 px-5">{index + 1}</td>

                    <td class="p-3 px-5">
                      <input type="text" value="" class="bg-transparent" />
                      {value.name}
                    </td>

                    <td class="p-3 px-5">
                      <input type="text" value="" class="bg-transparent" />
                      {value.dateOfBirth}
                    </td>

                    <td class="p-3 text-center">
                      <input type="text" value="" class="bg-transparent" />
                      {value.email}
                    </td>

                    <td class="p-3 px-5 flex justify-end"></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>




    </>
  );
};

export default Attendance;
