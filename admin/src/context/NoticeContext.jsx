import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

// Initial State with type safety
const initialState = {
  notices: [],
  loading: false,
  error: null,
};

// Validate notice structure
const validateNotice = (notice) => {
  if (!notice) return null;
  
  return {
    _id: notice._id || Date.now().toString(),
    title: notice.title || 'Untitled Notice',
    description: notice.description || '',
    slug: notice.slug || '',
    createdAt: notice.createdAt || new Date().toISOString(),
    updatedAt: notice.updatedAt || new Date().toISOString()
  };
};

// Reducer with data validation
const noticeReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_NOTICES_START":
      return { ...state, loading: true, error: null };
      
    case "FETCH_NOTICES_SUCCESS":
      return { 
        ...state, 
        loading: false, 
        notices: Array.isArray(action.payload) 
          ? action.payload.map(validateNotice).filter(Boolean) 
          : [] 
      };
      
    case "FETCH_NOTICES_ERROR":
      return { 
        ...state, 
        loading: false, 
        error: action.payload || "Failed to fetch notices" 
      };
      
    case "ADD_NOTICE":
      const newNotice = validateNotice(action.payload);
      return newNotice 
        ? { ...state, notices: [newNotice, ...state.notices] }
        : state;
        
    case "UPDATE_NOTICE":
      const updatedNotice = validateNotice(action.payload);
      return updatedNotice
        ? {
            ...state,
            notices: state.notices.map((notice) =>
              notice._id === updatedNotice._id ? updatedNotice : notice
            ),
          }
        : state;
        
    case "DELETE_NOTICE":
      return {
        ...state,
        notices: state.notices.filter((notice) => notice._id !== action.payload),
      };
      
    default:
      return state;
  }
};

// Context
const NoticeBoardContext = createContext();

// Provider with enhanced error handling
export const NoticeBoardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(noticeReducer, initialState);
  const API = "https://hpla.in/api/notice";

  // Fetch notices with retry logic
  const fetchNotices = async () => {
    dispatch({ type: "FETCH_NOTICES_START" });
    try {
      const res = await axios.get(`${API}/getNotice`);
      if (!res.data?.data) {
        throw new Error("Invalid data format from server");
      }
      dispatch({ type: "FETCH_NOTICES_SUCCESS", payload: res.data.data });
    } catch (err) {
      console.error("Fetch notices error:", err);
      dispatch({
        type: "FETCH_NOTICES_ERROR",
        payload: err.response?.data?.message || err.message,
      });
      // Consider adding retry logic here if needed
    }
  };

  // Add notice with validation
  const addNotice = async (newNotice) => {
    try {
      if (!newNotice?.title) {
        throw new Error("Title is required");
      }
      
      const res = await axios.post(`${API}/saveNotice`, newNotice);
      if (!res.data?.data) {
        throw new Error("Invalid response format");
      }
      
      dispatch({ type: "ADD_NOTICE", payload: res.data.data });
      return { success: true, data: res.data.data };
    } catch (err) {
      console.error("Add notice error:", err);
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    }
  };

  // Update notice with validation
  const updateNotice = async (updatedNotice) => {
    try {
      if (!updatedNotice?._id) {
        throw new Error("Notice ID is required for update");
      }
      
      const res = await axios.post(`${API}/editNotice`, updatedNotice);
      if (!res.data?.data) {
        throw new Error("Invalid response format");
      }
      
      dispatch({ type: "UPDATE_NOTICE", payload: res.data.data });
      return { success: true, data: res.data.data };
    } catch (err) {
      console.error("Update notice error:", err);
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    }
  };

  // Delete notice with validation
  const deleteNotice = async (id) => {
    try {
      if (!id) {
        throw new Error("Notice ID is required for deletion");
      }
      
      await axios.delete(`${API}/DeleteNotice`, { params: { id } });
      dispatch({ type: "DELETE_NOTICE", payload: id });
      return { success: true };
    } catch (err) {
      console.error("Delete notice error:", err);
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    }
  };

  // Auto-fetch on mount with cleanup
  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      if (isMounted) {
        await fetchNotices();
      }
    };
    
    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <NoticeBoardContext.Provider
      value={{
        notices: state.notices,
        loading: state.loading,
        error: state.error,
        fetchNotices,
        addNotice,
        updateNotice,
        deleteNotice,
      }}
    >
      {children}
    </NoticeBoardContext.Provider>
  );
};

// Custom hook with validation
export const useNoticeBoard = () => {
  const context = useContext(NoticeBoardContext);
  if (!context) {
    throw new Error("useNoticeBoard must be used within a NoticeBoardProvider");
  }
  return context;
};