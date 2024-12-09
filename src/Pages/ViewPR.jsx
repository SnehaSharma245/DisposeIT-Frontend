import React, { useState, useEffect } from 'react';

const ViewPR = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      userName: 'Shubh Verma',
      userEmail: 'shubhverma2003@gmail.com',
      pickupLocation: 'Indore, Madhya Pradesh',
      pickupTime: '2024-12-12 10:00 AM',
      status: 'Pending',
    },
    {
      id: 2,
      userName: 'Sneha Sharma',
      userEmail: 'snehav2109@gmail.com',
      pickupLocation: 'Indore, Madhya Pradesh',
      pickupTime: '2024-12-08 02:00 PM',
      status: 'Completed',
    },
    // Add more requests here
  ]);

  const handleStatusChange = (id, newStatus) => {
    // Update the status of the request
    setRequests(requests.map(request =>
      request.id === id ? { ...request, status: newStatus } : request
    ));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Pickup Requests</h1>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">User</th>
            <th className="py-2 px-4 border-b">Location</th>
            <th className="py-2 px-4 border-b">Pickup Time</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td className="py-2 px-4 border-b">{request.userName} ({request.userEmail})</td>
              <td className="py-2 px-4 border-b">{request.pickupLocation}</td>
              <td className="py-2 px-4 border-b">{request.pickupTime}</td>
              <td className="py-2 px-4 border-b">{request.status}</td>
              <td className="py-2 px-4 border-b">
                {request.status === 'Pending' ? (
                  <>
                    <button
                      className="bg-green-500 text-white py-1 px-3 rounded mr-2 hover:bg-green-600"
                      onClick={() => handleStatusChange(request.id, 'Confirmed')}
                    >
                      Confirm
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                      onClick={() => handleStatusChange(request.id, 'Rejected')}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span className="text-gray-500">Action Completed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewPR;
