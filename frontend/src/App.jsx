import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import { LandingMain } from "./Components/landingMain/LandingMain";
import { Footer } from "./Components/Footer/Footer";
import { RegisterPage } from "./Components/Register/Register";
import { LoginPage } from "./Components/Login/Login";
import { ConfirmEmail } from "./Components/Register/ConfirmEmail/ConfirmEmail";
import { MyAccount } from "./Components/User/MyAccount/MyAccount";
import { useEffect, useContext } from "react";
import { MyContext } from "./Contexts/Main_context";
import { getUserInfo } from "./Utils/getUserInfo";
import { ForumMain } from "./Components/Forum/ForumMain";
// forum content
import { ForumInfo } from "./Components/Forum/community_support/ForumInfo/ForumInfo";
import { ForumHelp } from "./Components/Forum/community_support/ForumHelp/ForumHelp";
import { ForumReports } from "./Components/Forum/community_support/ForumReports/ForumReports";
import { ForumGeneralDiscussions } from "./Components/Forum/server_content/ForumGeneralDiscussions";
import { ForumRoles } from "./Components/Forum/server_content/ForumRoles";
import { ForumContributions } from "./Components/Forum/server_content/ForumContributions";
import { Announces } from "./Components/Forum/community_support/ForumInfo/announces/Announces";
import { Rules } from "./Components/Forum/community_support/ForumInfo/rules/Rules";
import { Updates } from "./Components/Forum/community_support/ForumInfo/updates/Updates";
import { MyProfile } from "./Components/User/MyAccount/MyProfile";
import { CreatePost } from "./Components/Forum/user_actions/CreatePost";
export const App = () => {
  const { setUser } = useContext(MyContext);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const validateToken = await fetch(
          "http://localhost:3000/auth/verifyToken",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!validateToken.ok) {
          console.error("Token inválido");
          return;
        }

        const data = await validateToken.json();
        const username = data?.user?.trim();

        if (!username) {
          console.error("No se recibió el usuario.");
          return;
        }

        const userObj = await getUserInfo(username);
        setUser((prev) => ({
          ...prev,
          user: userObj,
          isLogged: true,
        }));
      } catch (error) {
        console.error("Error al verificar el token:", error);
      }
    };

    verifyToken();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LandingMain />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        {/* //forum routes */}
        <Route path="/forum" element={<ForumMain />} />
        {/* community support */}
        <Route path="/forum/info" element={<ForumInfo />} />
        {/* inside info routes */}
        <Route path="/forum/info/announces" element={<Announces />} />
        <Route path="/forum/info/rules" element={<Rules />} />
        <Route path="/forum/info/updates" element={<Updates />} />

        <Route path="/forum/help" element={<ForumHelp />} />
        <Route path="/forum/reports" element={<ForumReports />} />
        {/* sv content */}
        <Route path="/forum/roles" element={<ForumRoles />} />
        <Route
          path="/forum/generalDiscussions"
          element={<ForumGeneralDiscussions />}
        />
        <Route path="/forum/contributions" element={<ForumContributions />} />

        {/* USER ROUTES */}
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/my-profile" element={<MyProfile />} />

        {/* user actions */}
        <Route path="/forum/create_post/:section" element={<CreatePost />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
