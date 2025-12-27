import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

console.log('index.tsx: 実行開始');

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('index.tsx: root要素が見つかりません');
  throw new Error('root要素が見つかりません');
}

console.log('index.tsx: root要素を取得しました', rootElement);

const root = ReactDOM.createRoot(rootElement);
console.log('index.tsx: ReactDOM.createRoot完了');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('index.tsx: render完了');

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker登録成功:', registration.scope);
        
        // 通知の許可をリクエスト
        if ('Notification' in window && Notification.permission === 'default') {
          Notification.requestPermission().then((permission) => {
            console.log('通知許可状態:', permission);
          });
        }
      })
      .catch((error) => {
        console.log('Service Worker登録失敗:', error);
      });
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

