"use client";
import { Plus } from "lucide-react";

import Link from "next/link";
import { useLeads } from "../../context/leadContext";

const getStatusColor = (status: string) => {
  switch (status) {
    case "New":
      return "bg-blue-100 text-blue-800";
    case "Engaged":
      return "bg-purple-100 text-purple-800";
    case "Proposal Sent":
      return "bg-yellow-100 text-yellow-800";
    case "Closed-Won":
      return "bg-green-100 text-green-800";
    case "Closed-Lost":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function Home() {
  const { leads } = useLeads();

  return (
    <div className='container mx-auto'>
      <div className='px-6 py-5 border-b border-gray-200'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
          <h2 className='text-xl font-semibold text-gray-800 mb-4 md:mb-0'>
            Lead Management
          </h2>
          <div className='flex flex-col sm:flex-row gap-3'>
            <Link href='/new-lead'>
              <button className='flex cursor-pointer items-center justify-center px-4 py-2 h-10 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 ease-in-out'>
                <Plus className='h-4 w-4 mr-2' />
                Add Lead
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className='overflow-x-auto w-full'>
        <table className='w-full table-fixed'>
          <thead>
            <tr className='bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              <th className='px-6 py-3 max-w-1/5'>
                <div className='flex items-center'>Name</div>
              </th>
              <th className='px-6 py-3 hidden md:table-cell max-w-1/5'>
                <div className='flex items-center'>Email</div>
              </th>
              <th className='px-6 py-3 max-w-1/5'>
                <div className='flex items-center'>Status</div>
              </th>
              <th className='px-6 py-3 max-w-1/5'>
                <div className='flex items-center'>Created</div>
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {leads.length > 0 ? (
              leads.map((lead) => (
                <tr key={lead._id} className='hover:bg-gray-50'>
                  <td className='px-2 whitespace-nowrap'>
                    <div className='flex items-center'>
                      <div className='ml-4'>
                        <div className='text-sm font-medium text-gray-900'>
                          {lead.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap hidden md:table-cell'>
                    <div className='text-sm text-gray-500'>{lead.email}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        lead.status
                      )}`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full'>
                      {lead.createdAt.split("T")[0]}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className='px-6 py-4 text-center text-sm text-gray-500'
                >
                  No leads found. Try adjusting your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
