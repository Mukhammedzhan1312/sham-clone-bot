// src/types/telegram.d.ts
interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
      // другие поля по необходимости
    };
    // другие поля initDataUnsafe
  };
  ready(): void;
  expand(): void;
  // добавь другие методы, если используешь (close, themeParams и т.д.)
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export {};