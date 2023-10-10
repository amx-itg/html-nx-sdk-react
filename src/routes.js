import { createBrowserRouter } from 'react-router-dom';
import NoMatch from './components/NoMatch';
import Layout from './containers/Layout';
import ChannelsPage from './pages/Channels';
import EmulatorPage from './pages/Emulator';
import FilesPage from './pages/Files';
import LevelsPage from './pages/Levels';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        path: 'channels',
        element: <ChannelsPage />,
      },
      {
        path: 'levels',
        element: <LevelsPage />,
      },
      {
        path: 'files',
        element: <FilesPage />,
      },
      {
        path: 'emulator',
        element: <EmulatorPage />,
      },
      { path: '*', element: <NoMatch /> },
    ],
  },
]);

export default routes;
