import { useState } from "react";
import { useAuth } from "../store/auth";
import Background from "./ui/Background";
import { HiEye , HiEyeOff} from "react-icons/hi";

const defaultFormData = {
  userId: "",
  site: "",
  username: "",
  password: "",
};

const Form = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const { prevPass, userLogged } = useAuth();
  const { API, token, loggedUserData } = useAuth();
  const [editingId, setEditingId] = useState(null);
  const [visiblePasswordId, setVisiblePasswordId] = useState(null);

  const togglePasswordVisibility = (id) => {
    setVisiblePasswordId(visiblePasswordId === id ? null : id);
  };

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDelete = async (id) => {
    const response = await fetch(`${API}/manager/passwords/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      userLogged();
    }
  };

  const handleEdit = (curPassword) => {
    setFormData({
      site: curPassword.site,
      username: curPassword.username,
      password: curPassword.password,
    });
    setEditingId(curPassword._id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      userId: loggedUserData._id,
    };

    const method = editingId ? "PUT" : "POST";
    const endPoint = editingId
      ? `${API}/manager/passwords/${editingId}`
      : `${API}/manager/passwords`;

    const response = await fetch(endPoint, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if (response.ok) {
      setFormData(defaultFormData);
      setEditingId(null);
      userLogged();
    }
  };

  return (
    <div>
      <Background />
      <div className="flex flex-col items-center my-12">
        <form
          action=""
          className="w-2/3 flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <input
            className="rounded-full px-2 py-1.5 border-2 border-orange-400"
            type="text"
            name="site"
            value={formData.site}
            onChange={handleInput}
            id=""
          />
          <div className="flex gap-4 w-full">
            <input
              className="border-2 w-2/3 px-2 py-1.5 rounded-full border-orange-400"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInput}
              id=""
            />
            <input
              className="border-2 w-1/3 px-2 py-1.5 rounded-full border-orange-400"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInput}
              id=""
              autoComplete="new-password"
            />
          </div>
          <button
            className="text-white border-2 rounded-full px-1.5 py-1.5 border-orange-400 hover:bg-orange-700"
            type="submit"
          >
            {editingId ? "Update Password" : "Save Password"}
          </button>
        </form>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Site Name
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Password
              </th>
              <th scope="col" className="px-6 py-3">
                Update
              </th>
              <th scope="col" className="px-6 py-3">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {prevPass.map((curPassword) => {
              return (
                <tr
                  key={curPassword._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {curPassword.site}
                  </th>
                  <td className="px-6 py-4">{curPassword.username}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-between items-center">
                      <span className="mr-2">
                        {visiblePasswordId === curPassword._id ? curPassword.password : '●●●●●●●'}
                      </span>
                      <button onClick={() => togglePasswordVisibility(curPassword._id)}>
    {visiblePasswordId === curPassword._id ? (
        <HiEye className="h-5 w-5" />
    ) : (
        <HiEyeOff className="h-5 w-5 " />
    )}
</button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={() => handleEdit(curPassword)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={() => handleDelete(curPassword._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Form;
