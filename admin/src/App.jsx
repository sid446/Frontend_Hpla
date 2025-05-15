import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import UserProtectedWrapper from './auth/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Member from './pages/Member';
import AddMemberPage from './components/AddMember';
import UserSignup from './pages/SignUp';
import Gallery from './pages/Gallery';
import OtherMember from './pages/OtherMember';
import { OtherMemberProvider } from './context/OtherMemberContext';
import AddOtherMemberPage from './components/AddOtherMember';
import News from './pages/News';
import { NewsProvider } from './context/NewsContext';
import AnnualReport from './pages/AnnualReport';
import NoticeBoard from './pages/NoticeBoard';


function App() {
  return (
    <>
    
     <NewsProvider>
     <OtherMemberProvider>
      <Routes>
        <Route 
          path="/" 
          element={
            <UserProtectedWrapper>
              <div className='bg-[#1D1B45]'>  {/* ✅ Wrap multiple elements inside a div */}
                <Header />
                <div className='flex'>
                <Sidebar />
                <Home />
                </div>
              </div>
            </UserProtectedWrapper>
          } 
        />
         <Route 
          path="/organization" 
          element={
            <UserProtectedWrapper>
              <div className='bg-[#1D1B45]'>  {/* ✅ Wrap multiple elements inside a div */}
                <Header />
                <div className='flex'>
                <Sidebar />
                <Member/>
                </div>
              </div>
            </UserProtectedWrapper>
          } 
        />
        <Route 
          path="/add-members" 
          element={
            <UserProtectedWrapper>
              <div className='bg-[#1D1B45]'>  {/* ✅ Wrap multiple elements inside a div */}
                <Header />
                <div className='flex '>
                <Sidebar />
               
                <AddMemberPage/>
                
                </div>
              </div>
            </UserProtectedWrapper>
          } 
        />
         <Route 
          path="/gallery" 
          element={
            <UserProtectedWrapper>
              <div className='bg-[#1D1B45]'>  {/* ✅ Wrap multiple elements inside a div */}
                <Header />
                <div className='flex '>
                <Sidebar />
               
               <Gallery/>
                
                </div>
              </div>
            </UserProtectedWrapper>
          } 
        />
        <Route 
          path="/annual-report" 
          element={
            <UserProtectedWrapper>
              <div className='bg-[#1D1B45]'>  {/* ✅ Wrap multiple elements inside a div */}
                <Header />
                <div className='flex '>
                <Sidebar />
               
               <AnnualReport/>
                
                </div>
              </div>
            </UserProtectedWrapper>
          } 
        />
        
        <Route 
          path="/other-member" 
          element={
            
            <UserProtectedWrapper>
              <div className='bg-[#1D1B45]'>  {/* ✅ Wrap multiple elements inside a div */}
                <Header />
                <div className='flex '>
                <Sidebar />
               
               <OtherMember/>
                
                </div>
              </div>
            </UserProtectedWrapper>
            
          } 
        />
        <Route 
          path="/add-other-member" 
          element={
            <OtherMemberProvider>
            <UserProtectedWrapper>
              <div className='bg-[#1D1B45]'>  {/* ✅ Wrap multiple elements inside a div */}
                <Header />
                <div className='flex '>
                <Sidebar />
               
                <AddOtherMemberPage/>
                
                </div>
              </div>
            </UserProtectedWrapper>
            </OtherMemberProvider>
          } 
        />
         <Route 
          path="/news" 
          element={
           
            <UserProtectedWrapper>
              <div className='bg-[#1D1B45]'>  {/* ✅ Wrap multiple elements inside a div */}
                <Header />
                <div className='flex'>
                <Sidebar />
                <News/>
                </div>
              </div>
              
            </UserProtectedWrapper>
            
          } 
        />
        <Route 
          path="/noticeboard" 
          element={
            <UserProtectedWrapper>
              <div className='bg-[#1D1B45]'>  {/* ✅ Wrap multiple elements inside a div */}
                <Header />
                <div className='flex '>
                <Sidebar />
               
               <NoticeBoard/>
                
                </div>
              </div>
            </UserProtectedWrapper>
          } 
        />
        
       
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signup" element={<UserSignup/>}/>
      </Routes>
      </OtherMemberProvider>
      </NewsProvider>

    </>
  );
}

export default App;
