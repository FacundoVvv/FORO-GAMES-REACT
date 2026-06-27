import { ReactNode } from 'react';
import { LandingMain } from '@Components/landingMain/LandingMain';
import { RegisterPage } from '@Components/Register/Register';
import { LoginPage } from '@Components/Login/Login';
import { ConfirmEmail } from '@Components/Register/ConfirmEmail/ConfirmEmail';
import { MyAccount } from '@Components/User/MyAccount/MyAccount';
import { ForumMain } from '@Components/Forum/ForumMain';
import { ForumInfo } from '@Components/Forum/community_support/ForumInfo/ForumInfo';
import { ForumHelp } from '@Components/Forum/community_support/ForumHelp/ForumHelp';
import { ForumReports } from '@Components/Forum/community_support/ForumReports/ForumReports';
import { Announces } from '@Components/Forum/community_support/ForumInfo/announces/Announces';
import { Rules } from '@Components/Forum/community_support/ForumInfo/rules/Rules';
import { Updates } from '@Components/Forum/community_support/ForumInfo/updates/Updates';
import { ForumGeneralDiscussions } from '@Components/Forum/server_content/ForumGeneralDiscussions';
import { ForumRoles } from '@Components/Forum/server_content/ForumRoles';
import { ForumContributions } from '@Components/Forum/server_content/ForumContributions';
import { MyProfile } from '@Components/User/MyAccount/MyProfile';
import { CreatePost } from '@Components/Forum/user_actions/CreatePost';

export interface AppRoute {
  path: string;
  element: ReactNode;
}

export const publicRoutes: AppRoute[] = [
  { path: '/', element: <LandingMain /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/confirm-email', element: <ConfirmEmail /> },
];

export const protectedRoutes: AppRoute[] = [
  // Forum
  { path: '/forum', element: <ForumMain /> },
  { path: '/forum/info', element: <ForumInfo /> },
  { path: '/forum/info/announces', element: <Announces /> },
  { path: '/forum/info/rules', element: <Rules /> },
  { path: '/forum/info/updates', element: <Updates /> },
  { path: '/forum/help', element: <ForumHelp /> },
  { path: '/forum/reports', element: <ForumReports /> },
  { path: '/forum/roles', element: <ForumRoles /> },
  { path: '/forum/generalDiscussions', element: <ForumGeneralDiscussions /> },
  { path: '/forum/contributions', element: <ForumContributions /> },
  { path: '/forum/create_post/:section', element: <CreatePost /> },
  // User
  { path: '/my-account', element: <MyAccount /> },
  { path: '/my-profile', element: <MyProfile /> },
];