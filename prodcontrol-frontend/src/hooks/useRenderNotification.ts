import { useState, useCallback } from 'react';

export const useRenderNotification = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [apiFailures, setApiFailures] = useState(0);

  const showRenderNotification = useCallback(() => {
    setShowNotification(true);
    setApiFailures(prev => prev + 1);
  }, []);

  const hideNotification = useCallback(() => {
    setShowNotification(false);
  }, []);

  const handleApiError = useCallback((error: any) => {
    // Verifica se é erro de conexão (network error, timeout, etc)
    if (
      error?.code === 'NETWORK_ERROR' ||
      error?.code === 'ERR_CONNECTION_REFUSED' ||
      error?.code === 'ERR_CONNECTION_TIMED_OUT' ||
      error?.message?.includes('Network Error') ||
      error?.message?.includes('timeout') ||
      error?.response?.status === 0 ||
      error?.response?.status >= 500
    ) {
      showRenderNotification();
    }
  }, [showRenderNotification]);

  return {
    showNotification,
    showRenderNotification,
    hideNotification,
    handleApiError,
    apiFailures
  };
};
