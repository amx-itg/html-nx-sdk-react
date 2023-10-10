/* eslint-disable */

import React, { createContext, useContext, useEffect } from 'react';
import { AmxControlService } from '../../../services/AmxControlService';

const amxControlServiceInstance = new AmxControlService();

const AmxControlServiceContext = createContext(amxControlServiceInstance);

// Convenience hook
export const useAmxControlService = () => useContext(AmxControlServiceContext);

export const AmxControlServiceProvider = (props) => {
  return (
    <AmxControlServiceContext.Provider
      value={amxControlServiceInstance}
      {...props}
    />
  );
};
