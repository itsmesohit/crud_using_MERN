import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';

export const UserList = () => {
    const [userData, setUserData] = useState(null);

    const getUsersData = async () => {
        const resp = await axios.get('/getUsers');
        console.log(resp);
        if(resp.data.user.length > 0){
            setUserData(resp.data.user);
        }
        // console.log(resp.data.user.length);
    }
    useEffect(() => {
        getUsersData();
    }, [userData])

    const handleEdit = async (userone) =>  {
        const userName = prompt('Enter your name', userone.name);
        const userEmail = prompt('Enter your email', userone.email);

        if(!userName || !userEmail){
            alert('Please enter your name and email');
        }else {
            const resp = await axios.put(`/editUser/${userone._id}`, {
                name: userName,
                email: userEmail
            });
            console.log(resp);
        }
    }
//  Delete user
    const handleDelete = async (userId) => {
        const resp = await axios.delete(`/deleteUser/${userId}`);
        console.log(resp);
        getUsersData();
    }
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-8">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            All Users
          </h1>
        </div>
        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Name
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Email
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Edit
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
                {userData && userData.map((userone) => (
                    <tr>
                    <td className="px-4 py-3">{userone.name}</td>
                    <td className="px-4 py-3">{userone.email}</td>
                    <td className="px-4 py-3">
                      <button className="hover:text-green-500" onClick={() => handleEdit(userone)}>Edit</button>
                    </td>
                    <td className="px-4 py-3 text-lg text-gray-900">
                      <button className="hover:text-red-500" onClick={() => handleDelete(userone._id)}>Delete</button>
                    </td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
