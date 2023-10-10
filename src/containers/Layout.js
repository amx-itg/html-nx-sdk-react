/* eslint-disable */

import './Layout.scss';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import AmxNxConnectionLogDrawer from '../components/AmxNxConnectionLogDrawer';
import { useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import AmxNxButton from '../components/AmxNxButton';
import eventBus from '../lib/eventBus';

const Layout = () => {
  const [isShowDrawer, setIsShowDrawer] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/channels');
    }

    eventBus.on('page.event', (data) => {
      console.log('Got Page Event, Switching Page to:', data);
      navigate(`/${data.toLowerCase()}`);
    })
  }, []);

  return (
    <>
      <header className="bd-header d-flex align-items-stretch border-bottom border-dark app-hearder">
        <div className="container-fluid d-flex align-items-center">
          <div className="d-flex align-items-center fs-4 text-white mb-0">
            <img
              src="/amx-logo-white.png"
              height="32"
              className="me-2"
              alt="Amx Logo"
            />
          </div>
          <ul className="ms-auto link-light nav">
            <li className="nav-item">
              <NavLink
                to="/channels"
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                Channels
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/levels" className="nav-link">
                Levels
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/files" className="nav-link">
                Files
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/emulator" className="nav-link">
                Emulator
              </NavLink>
            </li>
            <li className="nav-item">
              <NavDropdown
                title="Navigation" className='p-0'
              >
                <NavDropdown.Item className='p-0'>
                  <AmxNxButton configuration={{ 'port': 13, 'channel': 100, 'text': 'Channels', style :'bg-dark-lighten d-block  border-0 rounded-0 text-decoration-none w-100' }}></AmxNxButton>
                </NavDropdown.Item>
                <NavDropdown.Item className='p-0'>
                  <AmxNxButton configuration={{ 'port': 13, 'channel': 101, 'text': 'Levels', style:'bg-dark-lighten d-block  border-0 rounded-0 text-decoration-none w-100' }}></AmxNxButton>
                </NavDropdown.Item>
                <NavDropdown.Item className='p-0'>
                  <AmxNxButton configuration={{ 'port': 13, 'channel': 102, 'text': 'Files', style: 'bg-dark-lighten d-block  border-0 rounded-0 text-decoration-none w-100' }}></AmxNxButton>
                </NavDropdown.Item>
                <NavDropdown.Item className='p-0'>
                  <AmxNxButton configuration={{ 'port': 13, 'channel': 103, 'text': 'Emulator', style: 'bg-dark-lighten d-block  border-0 rounded-0 text-decoration-none w-100' }}></AmxNxButton>
                </NavDropdown.Item>

              </NavDropdown>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="btn btn-default btn-logs p-0"
                onClick={() => setIsShowDrawer(!isShowDrawer)}
              >
                <i className="bi bi-terminal" />
              </button>
            </li>
          </ul>
        </div>
      </header>
      <main>
        <div className="container-fluid app-container">
          <Outlet />
        </div>
      </main>
      <AmxNxConnectionLogDrawer
        show={isShowDrawer}
        onHide={() => setIsShowDrawer(!isShowDrawer)}
      />
    </>
  );
};

export default Layout;
