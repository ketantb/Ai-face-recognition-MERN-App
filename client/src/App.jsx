import './App.css';
import { Routes, Route } from 'react-router-dom'

import AppNavbar from './components/app-navbar/AppNavbar';
import Signin from './components/signin/Signin';
import DashBoardDetails from './components/dashboard-details/DashBoardDetails';
import SetupWatermark from './components/setup-watermark/SetupWatermark';
import Gallary from './components/gallary/Gallary';
import FaceRecognitionGallery from './components/face-recognition-gallery/face-recognition-gallery';

function App() {
  return (
    <>
      <AppNavbar />
      <div style={{marginTop:'5rem'}}>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/dashboard-details' element={<DashBoardDetails />} />
        <Route path='/watermaker-setup' element={<SetupWatermark/>}/>
        <Route path='/gallary/:id' element={<Gallary/>}/>
        <Route path='/facerecognitiongallery' element={<FaceRecognitionGallery/>}/>
      </Routes>
      </div>
    </>
  );
}

export default App;
