import config from '~/config';

// Layouts
import { HeaderOnly } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Live from '~/pages/Live';
import Video from '~/pages/Video';
import Logout from '~/pages/Logout';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.live, component: Live, layout: HeaderOnly },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.upload, component: Upload },
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.video, component: Video, layout: null },
    { path: config.routes.logout, component: Logout, layout: null },
    { path: config.routes.feedback, component: Profile, layout: null },
    { path: config.routes.settings, component: Profile, layout: null },
    { path: config.routes.coin, component: Profile, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
