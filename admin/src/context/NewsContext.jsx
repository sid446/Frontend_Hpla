import { createContext, useContext, useReducer, useEffect } from "react";

// Initial State
const initialState = {
  news: [],
  loading: false,
  uploadLoading: false,
  error: null,
  successMessage: ''
};

// Reducer Function
const newsReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_NEWS_START":
      return { ...state, loading: true, error: null };
    case "FETCH_NEWS_SUCCESS":
      return { ...state, loading: false, news: action.payload };
    case "FETCH_NEWS_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "ADD_NEWS_START":
      return { ...state, uploadLoading: true, error: null, successMessage: '' };
    case "ADD_NEWS_SUCCESS":
      return { 
        ...state, 
        uploadLoading: false, 
        news: [...state.news, action.payload],
        successMessage: 'Article published successfully!'
      };
    case "ADD_NEWS_ERROR":
      return { ...state, uploadLoading: false, error: action.payload };
    case "CLEAR_MESSAGES":
      return { ...state, error: null, successMessage: '' };
    default:
      return state;
  }
};

// Create Context
const NewsContext = createContext();

// Provider Component
export const NewsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(newsReducer, initialState);

  // Fetch news from API
  const fetchNews = async () => {
    dispatch({ type: "FETCH_NEWS_START" });
    try {
      const response = await fetch("https://hpla.in/api/news/get-news");
      const data = await response.json();
      
      if (data.success) {
        dispatch({ type: "FETCH_NEWS_SUCCESS", payload: data.data });
      } else {
        dispatch({ type: "FETCH_NEWS_ERROR", payload: data.message || "Failed to fetch news" });
      }
    } catch (error) {
      dispatch({ type: "FETCH_NEWS_ERROR", payload: error.message });
    }
  };

  // Fetch news on mount
  useEffect(() => {
    fetchNews();
  }, []);

  // Add a new news article
 // Add a new news article
const addNews = async (newArticle) => {
  if (!newArticle.title?.trim() || !newArticle.content?.trim() || !newArticle.category) {
    dispatch({ type: "ADD_NEWS_ERROR", payload: "Title, content, and category are required" });
    return;
  }

  dispatch({ type: "ADD_NEWS_START" });

  try {
    const formData = new FormData();
    formData.append('title', newArticle.title);
    formData.append('content', newArticle.content);
    formData.append('category', newArticle.category);

    // ✅ Correctly append image files
    for (let i = 0; i < (newArticle.imageFiles?.length || 0); i++) {
      formData.append('images', newArticle.imageFiles[i]);
    }

    const response = await fetch("https://hpla.in/api/news/save-news", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to save news");
    }

    dispatch({ type: "ADD_NEWS_SUCCESS", payload: data.data });
    setTimeout(() => dispatch({ type: "CLEAR_MESSAGES" }), 3000);
    return data.data;

  } catch (error) {
    dispatch({ type: "ADD_NEWS_ERROR", payload: error.message || "Failed to upload news article" });
    return null;
  }
};


  // Clear error and success messages
  const clearMessages = () => {
    dispatch({ type: "CLEAR_MESSAGES" });
  };

  return (
    <NewsContext.Provider value={{ ...state, fetchNews, addNews, clearMessages }}>
      {children}
    </NewsContext.Provider>
  );
};

// Custom Hook for Easy Access
export const useNews = () => {
  return useContext(NewsContext);
};