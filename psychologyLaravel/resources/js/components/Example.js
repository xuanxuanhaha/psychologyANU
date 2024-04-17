import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route, Routes, Navigate} from 'react-router-dom'
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

import Home from './home/home';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import ForgetPassword from './ForgetPassword/ForgetPassword'
import ResetPassword from './ResetPassword/ResetPassword'
import Dashboard from './Dashboard/Dashboard'
import Session1 from './Session1Folder/Session1/Session1'
import Session1Grading from './Session1Folder/Session1Grading/Session1Grading'
import Session1worksheet1start from './Session1Folder/Session1worksheet1start/Session1worksheet1start'
import Session1WorksheetQ1 from './Session1Folder/Session1WorksheetQ1/Session1WorksheetQ1'
import Session1WorksheetQ2 from './Session1Folder/Session1WorksheetQ2/Session1WorksheetQ2'
import Session1worksheet2start from './Session1Folder/Session1worksheet2start/Session1worksheet2start'
import Session1worksheet2Q1 from './Session1Folder/Session1worksheet2Q1/Session1worksheet2Q1'

import Session1End from './Session1Folder/Session1End/Session1End'
import Session1Worksheet2Q2 from './Session1Folder/Session1Worksheet2Q2/Session1Worksheet2Q2'
import Session1Worksheet3Q1 from './Session1Folder/Session1Worksheet3Q1/Session1Worksheet3Q1'
import Session1Worksheet3Q2 from './Session1Folder/Session1Worksheet3Q2/Session1Worksheet3Q2'

import Session2Worksheet1Q1 from './Session2Folder/Session2Worksheet1Q1/Session2Worksheet1Q1'
import Session2Worksheet2start from './Session2Folder/Session2Worksheet2start/Session2Worksheet2start'
import Session2Worksheet2Q1 from './Session2Folder/Session2Worksheet2Q1/Session2Worksheet2Q1'
import Session2Worksheet2Q2 from './Session2Folder/Session2Worksheet2Q2/Session2Worksheet2Q2'
import Session2Worksheet3start from './Session2Folder/Session2Worksheet3start/Session2Worksheet3start'

// BASC
import Session1B from './BASC/Session1Folder/Session1B/Session1B'
import Session1GradingB from  './BASC/Session1Folder/Session1GradingB/Session1GradingB'
import Session1worksheet1startB from './BASC/Session1Folder/Session1worksheet1startB/Session1worksheet1startB'
import Session1WorksheetQ1B from './BASC/Session1Folder/Session1WorksheetQ1B/Session1WorksheetQ1B'
import Session1WorksheetQ2B from './BASC/Session1Folder/Session1WorksheetQ2B/Session1WorksheetQ2B'
import Session1worksheet2startB from './BASC/Session1Folder/Session1worksheet2startB/Session1worksheet2startB'
import Session1worksheet2Q1B from './BASC/Session1Folder/Session1worksheet2Q1B/Session1worksheet2Q1B'
import Session2B from './BASC/Session2Folder/Session2B/Session2B'
import Session2Worksheet1B from './BASC/Session2Folder/Session2Worksheet1B/Session2Worksheet1B'
import Session3B from './BASC/Session3Folder/Session3B/Session3B'
import Session3Worksheet1B from './BASC/Session3Folder/Session3Worksheet1B/Session3Worksheet1B'
import Session3Worksheet2B from './BASC/Session3Folder/Session3Worksheet2B/Session3Worksheet2B'
import Session3Worksheet3B from './BASC/Session3Folder/Session3Worksheet3B/Session3Worksheet3B'




import { useSelector, useDispatch } from 'react-redux';
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Session1worksheet4Start from './Session1Folder/Session1Worksheet4Start/Session1Worksheet4Start';
import Session1worksheet4Q1 from './Session1Folder/Session1Worksheet4Q1/Session1Worksheet4Q1';
import Session2 from './Session2Folder/Session2/Session2';
import Session2Worksheet3Q1 from './Session2Folder/Session2Worksheet3Q1/Session2Worksheet3Q1';
import Session2Worksheet3Q2 from './Session2Folder/Session2Worksheet3Q2/Session2Worksheet3Q2';
import Session2Summary from './Session2Folder/Session2Summary/Session2Summary';
import Session2End from './Session2Folder/Session2End/Session2End';
import Session3 from './Session3Folder/Session3/Session3';
import Session3Review from './Session3Folder/Session3Review/Session3Review';
import Session3Worksheet1start from './Session3Folder/Session3Worksheet1start/Session3Worksheet1start';
import Session3Worksheet1Q1 from './Session3Folder/Session3Worksheet1Q1/Session3Worksheet1Q1';
import Session3Worksheet1Q2 from './Session3Folder/Session3Worksheet1Q2/Session3Worksheet1Q2';
import Session3Worksheet1Q3 from './Session3Folder/Session3Worksheet1Q3/Session3Worksheet1Q3';
import Session3Worksheet1Q4 from './Session3Folder/Session3Worksheet1Q4/Session3Worksheet1Q4';
import Session3Worksheet1end from './Session3Folder/Session3Worksheet1end/Session3Worksheet1end';
import Session3End from './Session3Folder/Session3End/Session3End';

import Session4 from './Session4Folder/Session4/Session4';
import Session4Intro from './Session4Folder/Session4Intro/Session4Intro';
import Session4Review from './Session4Folder/Session4Review/Session4Review';
import Session4Review2 from './Session4Folder/Session4Review2/Session4Review2';
import Session4Worksheet1Start from './Session4Folder/Session4Worksheet1Start/Session4Worksheet1Start';
import Session4Worksheet1Q1 from './Session4Folder/Session4Worksheet1Q1/Session4Worksheet1Q1';
import Session4Worksheet1end from './Session4Folder/Session4Worksheet1end/Session4Worksheet1end';
import Session4End from './Session4Folder/Session4End/Session4End';

import DataGenerate from './DataGenerate/DataGenerate'
import Session5End from './Session5Folder/Session5End/Session5End';



const ProtectedPage = () => {
    return <h1>Protected Page</h1>;
  };

function Example() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element = {<Home />}/>
                    <Route path="/signup" element = {<Signup />}/>
                    <Route path="/login" element = {<Login />}/>
                    <Route path="/forgetpassword" element = {<ForgetPassword />}/>
                    <Route path="/resetpassword" element={<ResetPassword />} />
                    <Route
                        path="/dashboard"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Dashboard />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                {/* BASCSI */}
                    <Route
                        path="/session1"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session1 />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                    <Route
                        path="/session1grading"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session1Grading />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                    <Route
                        path="/session1worksheet1start"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session1worksheet1start />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                    <Route
                        path="/session1worksheetq1"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session1WorksheetQ1 />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                    <Route
                        path="/session1worksheetq2"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session1WorksheetQ2 />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session1worksheet2start"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session1worksheet2start />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session1worksheet2q1"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session1worksheet2Q1 />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session1worksheet2q2"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              // <Session1Worksheet2Q2 />
                              <Session2 /> // swap path with Session1Worksheet2Q2 component
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session1worksheet3q1"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session1Worksheet3Q1 />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session1worksheet3q2"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session1Worksheet3Q2 />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session1worksheet4start"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session1worksheet4Start />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session1worksheet4q1"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session1worksheet4Q1 />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session1end"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session1End />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session2"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              // <Session2 />
                              <Session1Worksheet2Q2 />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session2worksheet1q1"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session2Worksheet1Q1 />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session2worksheet2start"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session2Worksheet2start />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session2worksheet2q1"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session2Worksheet2Q1 />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session2worksheet2q2"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session2Worksheet2Q2 />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session2worksheet3start"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              // <Session2Worksheet3start />
                              // <Session3 />
                              <Session4 />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session2worksheet3q1"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session2Worksheet3Q1 />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session2worksheet3q2"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session2Worksheet3Q2 />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session2summary"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session2Summary />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session2end"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session2End />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session3"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              // <Session3 />
                              <Session2Worksheet3start />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session3review"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session3Review />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session3worksheet1start"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session3Worksheet1start />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session3worksheet1q1"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session3Worksheet1Q1 />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session3worksheet1q2"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session3Worksheet1Q2 />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session3worksheet1q3"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session3Worksheet1Q3 />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session3worksheet1q4"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session3Worksheet1Q4 />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session3worksheet1end"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session3Worksheet1end />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session3end"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session3End />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />

                      <Route
                        path="/session4"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              // <Session4 />
                              <Session3 />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session4intro"
                        element={
                          isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                            <Session4Intro />
                          ) : (
                            <Navigate to="/login" replace state={{ from: '/protected' }} />
                          )
                        }
                      />
                      <Route
                        path="/session4review"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session4Review />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session4review2"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session4Review2 />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session4worksheet1start"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session4Worksheet1Start />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session4worksheet1q1"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session4Worksheet1Q1 />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session4worksheet1end"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session4Worksheet1end />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session4end"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session4End />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/dataGenerate"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <DataGenerate />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session5"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session4 />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session5end"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session5End />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />


                      {/* BASC */}
                      <Route
                        path="/session1B"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session1B />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session1gradingb"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session1GradingB />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                    <Route
                        path="/session1worksheet1startb"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session1worksheet1startB />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                    <Route
                        path="/session1worksheetq1b"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session1WorksheetQ1B />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session1worksheetq2b"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session1WorksheetQ2B />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        /> 
                      <Route
                        path="/session1worksheet2startb"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session1worksheet2startB />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session1worksheet2q1b"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session1worksheet2Q1B />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session2b"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session2B />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session2worksheet1b"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session2Worksheet1B />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session3b"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session3B />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session3worksheet1b"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session3Worksheet1B />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/session3worksheet2b"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session3Worksheet2B />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />
                      <Route
                        path="/sessioneworksheet3b"
                        element={
                            isAuthenticated || localStorage.getItem('isAuthenticated') === 'true' ? (
                              <Session3Worksheet3B />
                            ) : (
                              <Navigate to="/login" replace state={{ from: '/protected' }} />
                            )
                          }
                        />

                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Example />
            </PersistGate>

        </Provider>

    , document.getElementById('example'));
}
