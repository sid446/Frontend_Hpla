import React, { createContext, useContext, useReducer, useEffect } from "react";

// Define types for member data
interface Member {
    _id: string;
    name: string;
    designation: string;
    affiliation: string;
    mobile: string;
    memberShipNumber: string;
    type: string;
    // Add any other fields that might exist in your member objects
}

// Define API response type
interface ApiResponse {
    statusCode: number;
    data: Member[];
    message?: string;
}

// Define the shape of the context state
interface OtherMemberState {
    members: Member[];
    loading: boolean;
    error: string | null;
}

// Define action types for the reducer
type OtherMemberAction =
    | { type: "FETCH_MEMBERS_START" }
    | { type: "FETCH_MEMBERS_SUCCESS"; payload: Member[] }
    | { type: "FETCH_MEMBERS_ERROR"; payload: string };

// Define the shape of the context value
interface OtherMemberContextValue extends OtherMemberState {
    fetchOtherMembers: () => Promise<{ success: boolean; data?: Member[]; message?: string }>;
    getMembersByType: (type: string) => Member[];
}

// Initial state for the context
const initialState: OtherMemberState = {
    members: [],
    loading: false,
    error: null
};

// Reducer to handle different actions
const OtherMemberReducer = (state: OtherMemberState, action: OtherMemberAction): OtherMemberState => {
    switch (action.type) {
        case "FETCH_MEMBERS_START":
            return { ...state, loading: true, error: null };

        case "FETCH_MEMBERS_SUCCESS":
            return { ...state, loading: false, members: action.payload, error: null };

        case "FETCH_MEMBERS_ERROR":
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

// Create the context with initial type
const OtherMemberContext = createContext<OtherMemberContextValue>({
    ...initialState,
    fetchOtherMembers: () => Promise.resolve({ success: false }),
    getMembersByType: () => []
});

// Custom hook to use the context
export const useOtherMember = (): OtherMemberContextValue => {
    const context = useContext(OtherMemberContext);
    if (!context) {
        throw new Error("useOtherMember must be used within an OtherMemberProvider");
    }
    return context;
};

// Provider component
export const OtherMemberProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(OtherMemberReducer, initialState);

    // Fetch all members using fetch API
    const fetchOtherMembers = async (): Promise<{ success: boolean; data?: Member[]; message?: string }> => {
        dispatch({ type: "FETCH_MEMBERS_START" });
        try {
            const response = await fetch('http://localhost:5000/otherMember/get-other-members');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: ApiResponse = await response.json();
            
            if (data && data.statusCode === 200) {
                dispatch({ 
                    type: "FETCH_MEMBERS_SUCCESS", 
                    payload: data.data || [] 
                });
                return { success: true, data: data.data || [] };
            } else {
                const errorMsg = data?.message || 'Failed to fetch members data';
                dispatch({ 
                    type: "FETCH_MEMBERS_ERROR", 
                    payload: errorMsg 
                });
                return { success: false, message: errorMsg };
            }
        } catch (err) {
            console.error('Error fetching members:', err);
            const errorMsg = err instanceof Error 
                ? err.message
                : 'An error occurred while fetching members';
            dispatch({ 
                type: "FETCH_MEMBERS_ERROR", 
                payload: errorMsg 
            });
            return { success: false, message: errorMsg };
        }
    };

    // Get members by type
    const getMembersByType = (type: string): Member[] => {
        return state.members.filter(member => member.type === type);
    };

    // Load members when the provider mounts
    useEffect(() => {
        fetchOtherMembers();
    }, []);

    // Value to be provided by the context
    const value: OtherMemberContextValue = {
        members: state.members,
        loading: state.loading,
        error: state.error,
        fetchOtherMembers,
        getMembersByType
    };

    return (
        <OtherMemberContext.Provider value={value}>
            {children}
        </OtherMemberContext.Provider>
    );
};

export default OtherMemberContext;