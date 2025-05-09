import { createContext, useContext, useReducer, useEffect } from "react";

// Initial State
const initialState = {
  members: [],
  loading: false,
  error: null,
};

// Reducer Function
const memberReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_MEMBERS_START":
      return { ...state, loading: true, error: null };
    case "FETCH_MEMBERS_SUCCESS":
      return { ...state, loading: false, members: action.payload };
    case "FETCH_MEMBERS_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "ADD_MEMBER":
      return { ...state, members: [...state.members, action.payload] };
    default:
      return state;
  }
};

// Create Context
const MemberContext = createContext();

// Provider Component
export const MemberProvider = ({ children }) => {
  const [state, dispatch] = useReducer(memberReducer, initialState);

  // Fetch members from API
  const fetchMembers = async () => {
    dispatch({ type: "FETCH_MEMBERS_START" });
    try {
      const response = await fetch("https://hpla.in/api/member/get-members"); // Update with your API URL
      const data = await response.json();
      
      if (data.success) {
        dispatch({ type: "FETCH_MEMBERS_SUCCESS", payload: data.data });
      } else {
        dispatch({ type: "FETCH_MEMBERS_ERROR", payload: "Failed to fetch members" });
      }
    } catch (error) {
      dispatch({ type: "FETCH_MEMBERS_ERROR", payload: error.message });
    }
  };

  // Fetch members on mount
  useEffect(() => {
    fetchMembers();
  }, []);

  // Add a new member (After Posting to Backend)
  const addMember = async (newMember) => {
    try {
      const response = await fetch("http://localhost:5000/api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMember),
      });

      const data = await response.json();
      if (data.success) {
        dispatch({ type: "ADD_MEMBER", payload: data.data });
      } else {
        console.error("Failed to add member:", data.message);
      }
    } catch (error) {
      console.error("Error adding member:", error.message);
    }
  };

  return (
    <MemberContext.Provider value={{ ...state, fetchMembers, addMember }}>
      {children}
    </MemberContext.Provider>
  );
};

// Custom Hook for Easy Access
export const useMembers = () => {
  return useContext(MemberContext);
};
