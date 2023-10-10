/* eslint-disable */
import './App.scss';
import { memo, useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import routes from './routes';
import PreLoading from './components/PreLoading';
import { diffObject } from './utils/diffObject';
import { useAmxControlService } from './hooks/amxControlService';

const App = () => {
  const [isPreloading, setIsPreloading] = useState(true);
  const amxControlService = useAmxControlService();

  useEffect(() => {
    (async () => {
      await amxControlService.getExternalCredentials(
        '/configuration/controller.json',
        true,
      );
      setTimeout(() => {
        setIsPreloading(false);
      }, 1000);
    })();
  }, ['']);
  return (
    <div className="wrapper">
      {isPreloading ? (
        <PreLoading />
      ) : (
        <RouterProvider
          router={routes}
          fallbackElement="loading"
          future={{ v7_startTransition: true }}
        />
      )}
    </div>
  );
};

const arePropsEqual = (oldProps, newProps) => {
  const changedProps = diffObject(oldProps, newProps);
  return changedProps.length === 0;
};

export default memo(App, arePropsEqual);
