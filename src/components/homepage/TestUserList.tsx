// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// interface User {
//   id: number;
//   fullname: string;
//   email: string;
//   photoProfileUrl?: string;
//   googleImageUrl?: string;
// }

// const TestUserList = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get<{ data: User[] }>(`${BACKEND_URL}/api/v1/user`);
//         console.log("API Response:", response.data); // Debugging

//         if (Array.isArray(response.data)) {
//           setUsers(response.data);
//         } else if (response.data?.data) {
//           setUsers(response.data.data);
//         } else {
//           throw new Error("Invalid response format");
//         }
//       } catch (err) {
//         setError("Failed to fetch users.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (loading) return <p className="text-center text-gray-500">Loading users...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="max-w-4xl mx-auto mt-6 p-4 bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Test User List (No Auth)</h2>
//       <table className="w-full border-collapse border border-gray-200">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border p-2">#</th>
//             <th className="border p-2">Profile</th>
//             <th className="border p-2">Full Name</th>
//             <th className="border p-2">Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, index) => (
//             <tr key={user.id} className="border">
//               <td className="border p-2 text-center">{index + 1}</td>
//               <td className="border p-2 text-center">
//                 <img
//                   src={user.photoProfileUrl || user.googleImageUrl || "/default-avatar.png"}
//                   alt={user.fullname}
//                   className="w-10 h-10 rounded-full object-cover mx-auto"
//                 />
//               </td>
//               <td className="border p-2">{user.fullname}</td>
//               <td className="border p-2">{user.email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TestUserList;
