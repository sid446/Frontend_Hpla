import React from "react";
import { useOtherMember } from "../../context/otherMemberContext";

function LifeMembers() {
    const { members, loading, error, getMembersByType } = useOtherMember();
    const lifeMembers = getMembersByType('Life Member');

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">Error loading life members: {error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="bg-white shadow rounded-lg overflow-hidden flex flex-col" style={{ height: '100vh' }}>
                <div className="px-6 py-4 border-b flex-shrink-0">
                    <h2 className="text-2xl font-semibold">Life Members</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {lifeMembers.length} {lifeMembers.length === 1 ? 'member' : 'members'} found
                    </p>
                </div>

                {lifeMembers.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 flex-grow flex items-center justify-center">
                        No life members found
                    </div>
                ) : (
                    <div className="flex flex-col flex-grow overflow-hidden">
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wider">
          <th className="px-6 py-3 font-medium sticky top-0 bg-gray-50">Name</th>
          <th className="px-6 py-3 font-medium sticky top-0 bg-gray-50">Designation</th>
          <th className="px-6 py-3 font-medium sticky top-0 bg-gray-50">Affiliation</th>
          <th className="px-6 py-3 font-medium sticky top-0 bg-gray-50">Membership #</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {lifeMembers.map((member) => (
          <tr key={member._id} className="hover:bg-gray-50">
            <td className="px-6 py-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-medium">
                    {member.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {member.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {member.mobile}
                  </p>
                </div>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="text-sm text-gray-900 max-w-xs truncate">
                {member.designation}
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="text-sm text-gray-900 max-w-xs truncate">
                {member.affiliation}
              </div>
            </td>
            <td className="px-6 py-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 truncate max-w-[120px]">
                {member.memberShipNumber}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

                )}
            </div>
        </div>
    );
}

export default LifeMembers;