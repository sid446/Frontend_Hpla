import { createContext, useContext, useReducer, useEffect } from "react";

const initialState = {
    annualReports: [],
    loading: false,
    error: null,
}

const annualReportReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_ANNUAL_REPORTS_START":
            return { ...state, loading: true, error: null };
        case "FETCH_ANNUAL_REPORTS_SUCCESS":
            return { ...state, loading: false, annualReports: action.payload };
        case "FETCH_ANNUAL_REPORTS_ERROR":
            return { ...state, loading: false, error: action.payload };
        case "ADD_ANNUAL_REPORT_START":
            return { ...state, loading: true, error: null };
        case "ADD_ANNUAL_REPORT_SUCCESS":
            return { ...state, loading: false, annualReports: [...state.annualReports, action.payload] };
        case "ADD_ANNUAL_REPORT_ERROR":
            return { ...state, loading: false, error: action.payload };
        case "DELETE_ANNUAL_REPORT_START":
            return { ...state, loading: true, error: null };
        case "DELETE_ANNUAL_REPORT_SUCCESS":
            return { ...state, loading: false, annualReports: state.annualReports.filter(report => report._id !== action.payload) }
        case "DELETE_ANNUAL_REPORT_ERROR":
            return { ...state, loading: false, error: action.payload };
        case "UPDATE_ANNUAL_REPORT_START":
            return { ...state, loading: true, error: null };
        case "UPDATE_ANNUAL_REPORT_SUCCESS":
            return {
                ...state,
                loading: false,
                annualReports: state.annualReports.map(report =>
                    report._id === action.payload._id ? { ...report, ...action.payload } : report
                ),
            };
        case "UPDATE_ANNUAL_REPORT_ERROR":
            return { ...state, loading: false, error: action.payload };
        
        default:
            return state;
    }
}

const AnnualReportContext = createContext();

export const AnnualReportProvider = ({ children }) => {
    const [state, dispatch] = useReducer(annualReportReducer, initialState);

    const fetchAnnualReports = async () => {
        dispatch({ type: "FETCH_ANNUAL_REPORTS_START" });
        try {
            const response = await fetch("https://hpla.in/api/annual/get-annual");
            const data = await response.json();

            if (data.success) {
                dispatch({ type: "FETCH_ANNUAL_REPORTS_SUCCESS", payload: data.data });
            } else {
                dispatch({ type: "FETCH_ANNUAL_REPORTS_ERROR", payload: "Failed to fetch annual reports" });
            }
        } catch (error) {
            dispatch({ type: "FETCH_ANNUAL_REPORTS_ERROR", payload: error.message });
        }
    };
    const updateAnnualReport = async (updatedReport) => {
        dispatch({type: "UPDATE_ANNUAL_REPORT_START"});
        try {
            const response = await fetch(`https://hpla.in/api/annual/edit-annual`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedReport),
            });
            const data = await response.json();

            if (data.success) {
                dispatch({ type: "UPDATE_ANNUAL_REPORT_SUCCESS", payload: data.data });
            } else {
                dispatch({ type: "UPDATE_ANNUAL_REPORT_ERROR", payload: data.message || "Failed to update annual report" });
            }
        } catch (error) {
            dispatch({ type: "UPDATE_ANNUAL_REPORT_ERROR", payload: error.message });
        }
    }
    const deleteAnnualReport = async (id) => {
        dispatch({ type: "DELETE_ANNUAL_REPORT_START" });
        try {
            const response = await fetch(`https://hpla.in/api/annual/delete-annual`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });
            const data = await response.json();

            if (data.success) {
                dispatch({ type: "DELETE_ANNUAL_REPORT_SUCCESS", payload: id });
                // Optionally refresh the list after deletion
                fetchAnnualReports();
            } else {
                dispatch({ type: "DELETE_ANNUAL_REPORT_ERROR", payload: data.message || "Failed to delete annual report" });
            }
        } catch (error) {
            dispatch({ type: "DELETE_ANNUAL_REPORT_ERROR", payload: error.message });
        }
    }

    const addAnnualReport = async (newAnnualReport) => {
        dispatch({ type: "ADD_ANNUAL_REPORT_START" });
        try {
            const response = await fetch("https://hpla.in/api/annual/create-annual", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newAnnualReport),
            });
            const data = await response.json();

            if (data.success) {
                dispatch({ type: "ADD_ANNUAL_REPORT_SUCCESS", payload: data.data });
                // Optionally refresh the list after adding
                fetchAnnualReports();
            } else {
                dispatch({ type: "ADD_ANNUAL_REPORT_ERROR", payload: data.message || "Failed to add annual report" });
            }
        } catch (error) {
            dispatch({ type: "ADD_ANNUAL_REPORT_ERROR", payload: error.message });
        }
    }

    useEffect(() => {
        fetchAnnualReports();
    }, []);

    return (
        <AnnualReportContext.Provider value={{ ...state, fetchAnnualReports, addAnnualReport,deleteAnnualReport, updateAnnualReport }}>
            {children}
        </AnnualReportContext.Provider>
    );
}

export const useAnnualReportContext = () => {
    return useContext(AnnualReportContext);
}