import React from "react";
import { trpc } from "@/utils/trpc";
import Spinner from "@/app/components/Spinner";

const UserTable = () => {
  const {
    data: users,
    isLoading,
    error,
  } = trpc.users.getAllUsers.useQuery(undefined, {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="overflow-x-auto text-sm">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-gray-600">Email</th>
            <th className="px-4 py-2 text-left text-gray-600">Created At</th>
            <th className="px-4 py-2 text-left text-gray-600">Updated At</th>
            <th className="px-4 py-2 text-left text-gray-600">About Me</th>
            <th className="px-4 py-2 text-left text-gray-600">Birthdate</th>
            <th className="px-4 py-2 text-left text-gray-600">Street</th>
            <th className="px-4 py-2 text-left text-gray-600">City</th>
            <th className="px-4 py-2 text-left text-gray-600">State</th>
            <th className="px-4 py-2 text-left text-gray-600">ZIP</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={user.id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">
                {new Date(user.createdAt).toLocaleString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td className="px-4 py-2">
                {new Date(user.updatedAt).toLocaleString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td className="px-4 py-2">{user.aboutMe || "N/A"}</td>
              <td className="px-4 py-2">
                {user.birthdate
                  ? new Date(user.birthdate).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  : "N/A"}
              </td>
              <td className="px-4 py-2">{user.address?.street || "N/A"}</td>
              <td className="px-4 py-2">{user.address?.city || "N/A"}</td>
              <td className="px-4 py-2">{user.address?.state || "N/A"}</td>
              <td className="px-4 py-2">{user.address?.zip || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
