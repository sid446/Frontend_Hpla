import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

// Initial state for the context
const initialState = {
    members: [],
    loading: false,
    error: null,
    selectedMember: null,
    isSubmitting: false,
    updateError: null,
    deleteError: null,
    isDeleting: false
};

// Reducer to handle different actions
const OtherMemberReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_MEMBERS_START":
            return { ...state, loading: true, error: null };

        case "FETCH_MEMBERS_SUCCESS":
            return { ...state, loading: false, members: action.payload, error: null };

        case "FETCH_MEMBERS_ERROR":
            return { ...state, loading: false, error: action.payload };

        case "ADD_MEMBER":
            return { ...state, members: [...state.members, action.payload] };
            
        case "SELECT_MEMBER":
            return { ...state, selectedMember: action.payload, updateError: null, deleteError: null };
            
        case "CLEAR_SELECTED_MEMBER":
            return { ...state, selectedMember: null, updateError: null, deleteError: null };
            
        case "UPDATE_MEMBER_START":
            return { ...state, isSubmitting: true, updateError: null };
            
        case "UPDATE_MEMBER_SUCCESS":
            return { 
                ...state, 
                isSubmitting: false, 
                selectedMember: null,
                members: state.members.map(member => 
                    member._id === action.payload._id ? action.payload : member
                )
            };
            
        case "UPDATE_MEMBER_ERROR":
            return { ...state, isSubmitting: false, updateError: action.payload };
            
        case "DELETE_MEMBER_START":
            return { ...state, isDeleting: true, deleteError: null };
            
        case "DELETE_MEMBER_SUCCESS":
            return { 
                ...state, 
                isDeleting: false, 
                selectedMember: null,
                members: state.members.filter(member => member._id !== action.payload)
            };
            
        case "DELETE_MEMBER_ERROR":
            return { ...state, isDeleting: false, deleteError: action.payload };

        case "SEARCH_MEMBERS":
            return { ...state, searchTerm: action.payload };

        default:
            return state;
    }
};

// Create the context
const OtherMemberContext = createContext();

// Custom hook to use the context
export const useOtherMember = () => useContext(OtherMemberContext);

// Provider component
export const OtherMemberProvider = ({ children }) => {
    const [state, dispatch] = useReducer(OtherMemberReducer, initialState);

    // Fetch all members
    const fetchOtherMembers = async () => {
        dispatch({ type: "FETCH_MEMBERS_START" });
        try {
            const response = await axios.get('http://localhost:5000/otherMember/get-other-members');
            if (response.data && response.data.statusCode === 200) {
                dispatch({ 
                    type: "FETCH_MEMBERS_SUCCESS", 
                    payload: response.data.data || [] 
                });
                return { success: true, data: response.data.data || [] };
            } else {
                const errorMsg = response.data?.message || 'Failed to fetch members data';
                dispatch({ 
                    type: "FETCH_MEMBERS_ERROR", 
                    payload: errorMsg 
                });
                return { success: false, message: errorMsg };
            }
        } catch (err) {
            console.error('Error fetching members:', err);
            const errorMsg = err.response?.data?.message || 'An error occurred while fetching members';
            dispatch({ 
                type: "FETCH_MEMBERS_ERROR", 
                payload: errorMsg 
            });
            return { success: false, message: errorMsg };
        }
    };

    // Add a new member
    const addOtherMember = async (memberData) => {
        try {
            const response = await axios.post(
                'http://localhost:5000/otherMember/save-other-member', 
                memberData,
                { 
                    headers: { 
                        'Content-Type': 'application/json' 
                    } 
                }
            );
            
            if (response.data && response.data.statusCode === 200) {
                dispatch({ type: "ADD_MEMBER", payload: response.data.data });
                return { success: true, data: response.data.data };
            } else {
                console.error("Failed to add member:", response.data.message);
                return { success: false, message: response.data.message };
            }
        } catch (error) {
            console.error("Error adding member:", error);
            const errorMessage = error.response?.data?.message || 
                               (error.response?.data?.error ? error.response.data.error : 'An error occurred while adding the member');
            return { 
                success: false, 
                message: errorMessage
            };
        }
    };

    // Select a member for editing
    const selectMember = (member) => {
        dispatch({ type: "SELECT_MEMBER", payload: member });
    };

    // Clear selected member
    const clearSelectedMember = () => {
        dispatch({ type: "CLEAR_SELECTED_MEMBER" });
    };

    // Update an existing member
    const updateOtherMember = async (memberData) => {
        if (!memberData._id) {
            dispatch({ type: "UPDATE_MEMBER_ERROR", payload: "Member ID is missing" });
            return { success: false, message: "Member ID is missing" };
        }
        
        dispatch({ type: "UPDATE_MEMBER_START" });
        
        try {
            // Prepare complete data object with all required fields
            const updateData = {
                id: memberData._id, // Map _id to id for backend
                name: memberData.name,
                designation: memberData.designation,
                affiliation: memberData.affiliation,
                mobile: memberData.mobile,
                memberShipNumber: memberData.memberShipNumber,
                type: memberData.type
            };
    
            const response = await axios.post(
                'http://localhost:5000/otherMember/update-other-member', 
                updateData,
                { 
                    headers: { 
                        'Content-Type': 'application/json' 
                    } 
                }
            );
            
            if (response.data && response.data.statusCode === 200) {
                dispatch({ type: "UPDATE_MEMBER_SUCCESS", payload: response.data.data });
                await fetchOtherMembers();
                return { success: true, data: response.data.data };
            } else {
                const errorMsg = response.data?.message || 'Failed to update member. Please try again.';
                dispatch({ type: "UPDATE_MEMBER_ERROR", payload: errorMsg });
                return { success: false, message: errorMsg };
            }
        } catch (err) {
            console.error("Failed to update member:", err);
            const errorMsg = err.response?.data?.message || 'An error occurred while updating the member';
            dispatch({ type: "UPDATE_MEMBER_ERROR", payload: errorMsg });
            return { success: false, message: errorMsg };
        }
    };

    // Delete a member
    const deleteOtherMember = async (memberId) => {
        if (!memberId) {
            dispatch({ type: "DELETE_MEMBER_ERROR", payload: "Member ID is missing" });
            return { success: false, message: "Member ID is missing" };
        }
        
        dispatch({ type: "DELETE_MEMBER_START" });
        
        try {
            const response = await axios.delete(
                `http://localhost:5000/otherMember/delete-other-member/${memberId}`
                // No /api prefix since you're using app.use("/otherMember")
            );
            
            if (response.data && response.data.statusCode === 200) {
                dispatch({ type: "DELETE_MEMBER_SUCCESS", payload: memberId });
                return { success: true };
            } else {
                const errorMsg = response.data?.message || 'Failed to delete member. Please try again.';
                dispatch({ type: "DELETE_MEMBER_ERROR", payload: errorMsg });
                return { success: false, message: errorMsg };
            }
        } catch (err) {
            console.error("Failed to delete member:", err);
            const errorMsg = err.response?.data?.message || 'An error occurred while deleting the member';
            dispatch({ type: "DELETE_MEMBER_ERROR", payload: errorMsg });
            return { success: false, message: errorMsg };
        }
    };

    // Search members by name or other properties
    const searchMembers = (term) => {
        dispatch({ type: "SEARCH_MEMBERS", payload: term });
        
        if (!term) return state.members;
        
        const searchTerm = term.toLowerCase();
        return state.members.filter(member => 
            member.name?.toLowerCase().includes(searchTerm) ||
            member.designation?.toLowerCase().includes(searchTerm) ||
            member.affiliation?.toLowerCase().includes(searchTerm) ||
            member.memberShipNumber?.toLowerCase().includes(searchTerm)
        );
    };

    // Get members by type
    const getMembersByType = (type) => {
        return state.members.filter(member => member.type === type);
    };

    // Load members when the provider mounts
    useEffect(() => {
        fetchOtherMembers();
    }, []);

    // Value to be provided by the context
    const value = {
        members: state.members,
        loading: state.loading,
        error: state.error,
        selectedMember: state.selectedMember,
        isSubmitting: state.isSubmitting,
        isDeleting: state.isDeleting,
        updateError: state.updateError,
        deleteError: state.deleteError,
        fetchOtherMembers,
        addOtherMember,
        selectMember,
        clearSelectedMember,
        updateOtherMember,
        deleteOtherMember,
        searchMembers,
        getMembersByType
    };

    return (
        <OtherMemberContext.Provider value={value}>
            {children}
        </OtherMemberContext.Provider>
    );
};

export default OtherMemberContext;