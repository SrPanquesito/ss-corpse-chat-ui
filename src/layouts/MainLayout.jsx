import React, { useEffect } from 'react';
import {
    Outlet
  } from 'react-router-dom';
import { useSettings, useDispatchSettings } from 'providers/settings';
import { AbsoluteProvider } from 'providers/absolute';
import NotificationAlertAbsolute from 'components/NotificationAlertAbsolute';

const MainLayout = () => {
    const settings = useSettings();
    const dispatchSettings = useDispatchSettings();
  
    useEffect(() => {
      dispatchSettings({type: 'darkmode/status'});
    }, [settings.darkmode]);
  
    return (
        <main className={'h-screen ' + (settings.darkmode ? 'dark' : '')}>
          <AbsoluteProvider>
            <Outlet />
            <NotificationAlertAbsolute />
          </AbsoluteProvider>
        </main>
    )
}

export default MainLayout;