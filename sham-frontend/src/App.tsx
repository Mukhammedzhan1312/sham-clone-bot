import { useEffect, useState } from 'react';
import { init, viewport, mainButton, retrieveLaunchParams } from '@telegram-apps/sdk';

function App() {
  const [isInTelegram, setIsInTelegram] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkTelegramEnv = () => {
      // Проверка на наличие Telegram.WebApp (теперь TS знает тип)
      if (window.Telegram?.WebApp) {
        try {
          if (init()) {
            viewport.expand();

            const params = retrieveLaunchParams();
            const user = params.initData?.user;
            const id = user?.id?.toString() || 'не видно';

            // setState асинхронно, чтобы избежать ESLint warning
            setTimeout(() => {
              setUserId(id);
              setIsInTelegram(true);
            }, 0);

            mainButton.mount();
            mainButton.setParams({
              text: 'Открыть Wallet (скоро)',
              isVisible: true,
              isEnabled: true,
            });

            mainButton.onClick(() => {
              alert('Main Button нажата!');
            });
          }
        } catch (err) {
          console.error('Telegram SDK error:', err);
          // fallback для dev
          setTimeout(() => {
            setUserId('DEV_FALLBACK');
            setIsInTelegram(false);
          }, 0);
        }
      } else {
        // Браузер / dev
        setTimeout(() => {
          setUserId('DEV_MODE_USER_123');
          setIsInTelegram(false);
        }, 0);
        console.log('Запущено вне Telegram');
      }
    };

    checkTelegramEnv();
  }, []);

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '40px 20px',
        background: 'linear-gradient(to bottom, #4CAF50, #2196F3)',
        color: 'white',
        height: '100vh',
        fontFamily: 'sans-serif',
      }}
    >
      <h1>ShamClone — как Blum!</h1>

      {isInTelegram ? (
        <p>Ты в Telegram! ID: {userId || 'Загрузка...'}</p>
      ) : (
        <p style={{ color: '#FFEB3B', fontWeight: 'bold' }}>
          Dev-режим (браузер). Открой через @shamclonebot!
          <br />
          Тестовый ID: {userId || 'Загрузка...'}
        </p>
      )}

      <p>Тапай ниже (пока тест)</p>
      <button
        style={{
          fontSize: '40px',
          padding: '20px 60px',
          background: '#FFEB3B',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          marginTop: '20px',
        }}
        onClick={() => alert('TAP! Скоро добавим поинты и энергию')}
      >
        TAP!
      </button>
    </div>
  );
}

export default App;