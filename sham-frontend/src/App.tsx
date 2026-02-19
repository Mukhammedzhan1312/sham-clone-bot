import { useEffect } from 'react';
import { init, viewport, mainButton, retrieveLaunchParams } from '@telegram-apps/sdk';  // ← добавили retrieveLaunchParams

function App() {
  useEffect(() => {
    if (init()) {  // Проверка, что внутри Mini App
      viewport.expand();  // Полный экран

      // Получаем данные пользователя безопасно
      const launchParams = retrieveLaunchParams();
      const user = launchParams.initData?.user;  // или launchParams.tgWebAppData?.user
      const userId = user?.id || 'не видно';

      alert(`Mini App запущен!\nТвой Telegram ID: ${userId}`);

      // Монтируем mainButton (обязательно в v2!)
      mainButton.mount();  // ← важно, иначе ничего не работает

      // Настраиваем кнопку
      mainButton.setParams({
        text: 'Открыть Wallet (скоро)',
        isVisible: true,
        isEnabled: true,          // вместо isActive
        isLoaderVisible: false,
        // bgColor: '#FFEB3B',    // можно добавить, если хочешь кастомный цвет
        // textColor: '#000000',
      });

      // Обработчик клика (правильный метод)
      mainButton.onClick(() => {
        alert('Main Button нажата! Скоро подключим TON Wallet 😈');
      });
    }
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
      <p>Тапай ниже, чтобы начать фармить поинты (пока тест)</p>
      <button
        style={{
          fontSize: '40px',
          padding: '20px 60px',
          background: '#FFEB3B',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
        }}
      >
        TAP!
      </button>
    </div>
  );
}

export default App;