import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AuthService from "./services/auth.service";
import Layout from "./components/Layout";
import HomeComponent from "./components/HomeComponent";
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import ProfileComponent from "./components/ProfileComponent";

function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  console.log("currentUser", currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        >
          {!currentUser ? (
            <>
              <Route
                path="/"
                element={
                  <LoginComponent
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                  />
                }
              />
              <Route path="/register" element={<RegisterComponent />} />
            </>
          ) : (
            <>
              <Route index element={<HomeComponent />} />
              <Route
                path="profile"
                element={
                  <ProfileComponent
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                  />
                }
              />
              {/*   <Route
            path="course"
            element={
              <CourseComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="postCourse"
            element={
              <PostCourseComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="enroll"
            element={
              <EnrollComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          /> */}
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
