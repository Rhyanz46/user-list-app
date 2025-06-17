"use client";
import { useState, useEffect } from 'react';

function UserModal({ user, isOpen, onClose }) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">User Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <p className="text-gray-900">{user.name}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <p className="text-gray-900">{user.username}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="text-gray-900">{user.email}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <p className="text-gray-900">{user.phone}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Website</label>
            <p className="text-gray-900">{user.website}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Company</label>
            <p className="text-gray-900">{user.company?.name}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <p className="text-gray-900">
              {user.address?.street}, {user.address?.suite}<br/>
              {user.address?.city}, {user.address?.zipcode}
            </p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function ListData({ users, searchTerm, onUserClick }) {
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ul>
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user) => (
          <li 
            key={user.id} 
            className="flex justify-between gap-x-6 py-5 hover:bg-gray-50 rounded-lg transition-colors" 
            style={{cursor: 'pointer'}}
            onClick={() => onUserClick(user)}
          >
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm/6 font-semibold text-gray-900">{user.name}</p>
                  <p className="mt-1 truncate text-xs/5 text-gray-500">{user.email}</p>
                </div>
              </div>
            </li>
        ))
      ) : (
        <li className="flex justify-center py-8">
          <p className="text-gray-500">No users found matching "{searchTerm}"</p>
        </li>
      )}
    </ul>
  )
}

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="flex items-center justify-center w-full">
      <input
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        type="text"
        placeholder="Search by name or email..."
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default function Home() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const userData = await response.json();
        setUsers(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div className="flex items-center justify-center">
            <p className="text-gray-500">Loading users...</p>
          </div>
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          Arian
        </footer>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div className="flex items-center justify-center">
            <p className="text-red-500">Error: {error}</p>
          </div>
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          Arian
        </footer>
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <div className="w-full max-w-md">
          <ListData users={users} searchTerm={searchTerm} onUserClick={handleUserClick} />
        </div>
      </main>
      
      <UserModal 
        user={selectedUser} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}
