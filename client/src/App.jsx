import './App.css';
import { Routes, Route } from 'react-router-dom'
import { store } from './store'
import { Provider } from 'react-redux';
import { Toaster } from "react-hot-toast";
import AppNavbar from './components/app-navbar/AppNavbar';
import Signin from './components/signin/Signin';
import DashBoardDetails from './components/dashboard-details/DashBoardDetails';
import SetupWatermark from './components/setup-watermark/SetupWatermark';
import Gallary from './components/gallary/Gallary';
import FaceRecognitionGallery from './components/face-recognition-gallery/face-recognition-gallery';
import HomePage from './components/home/home-page';
import EventFormPage from './components/event-form-page/event-form-page';

function App() {
  return (
    <Provider store={store}>
      <Toaster position="top-center" reverseOrder={false} />
      <AppNavbar />
      <div style={{ marginTop: '5rem' }}>
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/home-page' element={<HomePage />} />
          <Route path='/dashboard-details' element={<DashBoardDetails />} />
          <Route path='/watermaker-setup' element={<SetupWatermark />} />
          <Route path='/gallary/:id' element={<Gallary />} />
          <Route path='/facerecognitiongallery' element={<FaceRecognitionGallery />} />
          <Route path='/event-form-page/:eventName/:eventId' element={<EventFormPage />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
