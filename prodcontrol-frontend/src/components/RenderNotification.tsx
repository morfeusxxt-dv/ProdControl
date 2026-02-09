import React, { useState, useEffect } from 'react';

interface RenderNotificationProps {
  isVisible: boolean;
  onClose: () => void;
}

export const RenderNotification: React.FC<RenderNotificationProps> = ({ isVisible, onClose }) => {
  const [countdown, setCountdown] = useState(120);

  useEffect(() => {
    if (isVisible && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, countdown]);

  if (!isVisible) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-yellow-800">
              ⚠️ Atenção: Backend em Reativação
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p className="mb-2">
                Nosso backend está hospedado gratuitamente no Render. Após 15 minutos de inatividade, 
                ele entra em modo de suspensão para economizar recursos.
              </p>
              <p className="mb-2">
                A primeira requisição pode levar <strong>1-2 minutos</strong> para reativar o sistema completamente.
              </p>
              <p className="font-medium">
                Por favor, aguarde e tente novamente.
                {countdown > 0 && (
                  <span className="ml-2 text-yellow-600">
                    (Tentando novamente em: {formatTime(countdown)})
                  </span>
                )}
              </p>
            </div>
            <div className="mt-3 flex space-x-2">
              <button
                onClick={() => window.location.reload()}
                className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-sm hover:bg-yellow-200 transition-colors"
              >
                🔄 Tentar Agora
              </button>
              <button
                onClick={onClose}
                className="text-yellow-600 hover:text-yellow-800 text-sm underline"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
