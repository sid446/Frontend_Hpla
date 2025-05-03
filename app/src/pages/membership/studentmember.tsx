import React from "react";
import { useOtherMember } from "../../context/otherMemberContext";

function StudentMember() {
    const { members, loading, error, getMembersByType } = useOtherMember();
    const studentMembers = getMembersByType('Student Member');

    if (loading) {
        return <div className="text-center py-8">Loading student members...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="bg-white shadow rounded-lg overflow-hidden flex flex-col" style={{ height: '100vh' }}>
                <div className="px-6 py-4 border-b">
                    <h2 className="text-2xl font-semibold">Student Members</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {studentMembers.length} members found
                    </p>
                </div>

                {studentMembers.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        No student members found
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-3 font-medium sticky top-0 bg-gray-50">Name</th>
                                    <th className="px-6 py-3 font-medium sticky top-0 bg-gray-50">Designation</th>
                                    <th className="px-6 py-3 font-medium sticky top-0 bg-gray-50">Institution</th>
                                    <th className="px-6 py-3 font-medium sticky top-0 bg-gray-50">Student ID</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {studentMembers.map((member) => (
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
                                                {member.designation || 'Student'}
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
                )}
            </div>
        </div>
    );
}

export default StudentMember;