import { createContext, useContext, useReducer, useEffect } from "react";

// 1. Define your Member type
interface MemberAvatar {
  url: string;
  publicId: string;
}

interface Member {
  _id: string;
  category: string;
  post: string;
  name: string;
  about: string;
  phoneNumber: string;
  email: string;
  avatar?: MemberAvatar;
}

// 2. Define state and context types
interface MemberState {
  members: Member[];
  loading: boolean;
  error: string | null;
}

interface MemberContextValue extends MemberState {
  fetchMembers: () => Promise<void>;
}

// 3. Create context with explicit type
const MemberContext = createContext<MemberContextValue | undefined>(undefined);

// 4. Reducer with proper typing
type MemberAction =
  | { type: "FETCH_MEMBERS_START" }
  | { type: "FETCH_MEMBERS_SUCCESS"; payload: Member[] }
  | { type: "FETCH_MEMBERS_ERROR"; payload: string };

const memberReducer = (state: MemberState, action: MemberAction): MemberState => {
  switch (action.type) {
    case "FETCH_MEMBERS_START":
      return { ...state, loading: true, error: null };
    case "FETCH_MEMBERS_SUCCESS":
      return { ...state, loading: false, members: action.payload };
    case "FETCH_MEMBERS_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// 5. Provider component
export const MemberProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(memberReducer, {
    members: [],
    loading: false,
    error: null,
  });

  const fetchMembers = async () => {
    dispatch({ type: "FETCH_MEMBERS_START" });
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/member/get-members`);


      const data = await response.json();
      
      if (data.success) {
        dispatch({ 
          type: "FETCH_MEMBERS_SUCCESS", 
          payload: data.data.map((member: any) => ({
            ...member,
            phoneNumber: member.phoneNumber || "",
            email: member.email || "",
          }))
        });
      } else {
        dispatch({ type: "FETCH_MEMBERS_ERROR", payload: "Failed to fetch members" });
      }
    } catch (error) {
      dispatch({ type: "FETCH_MEMBERS_ERROR", payload: (error as Error).message });
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const value: MemberContextValue = {
    ...state,
    fetchMembers,
  };

  return (
    <MemberContext.Provider value={value}>
      {children}
    </MemberContext.Provider>
  );
};

// 6. Custom hook with proper typing
export const useMembers = (): MemberContextValue => {
  const context = useContext(MemberContext);
  if (context === undefined) {
    throw new Error('useMembers must be used within a MemberProvider');
  }
  return context;
};