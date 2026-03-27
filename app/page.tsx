'use client';

import { useState } from 'react';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  // 新增：用于存储用户输入的文字
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleAuth = async () => {
    setMessage('正在处理...');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      
      setMessage(data.success ? `✅ ${data.message}` : `❌ ${data.message}`);
    } catch (e) {
      setMessage('❌ 网络请求失败');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50 text-black">
      <div className="z-10 w-full max-w-md p-8 bg-white rounded-xl shadow-lg text-center border border-gray-100">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          {isLogin ? 'AIXELIS 会员登录' : 'AIXELIS 会员注册'}
        </h1>
        
        <div className="space-y-4 text-left">
          <div>
            <label className="text-sm font-medium text-gray-700">用户名</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="请输入用户名" 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">密码</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码" 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none mt-1"
            />
          </div>
          
          <button 
            onClick={handleAuth}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-md active:scale-95"
          >
            {isLogin ? '立即登录' : '立即注册'}
          </button>
        </div>

        {message && (
          <p className={`mt-4 text-sm font-medium ${message.includes('✅') ? 'text-green-600' : 'text-red-500'}`}>
            {message}
          </p>
        )}

        <p className="mt-6 text-sm text-gray-500 border-t pt-4">
          {isLogin ? '还没有账号？' : '已有账号？'}{' '}
          <button 
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage('');
            }}
            className="text-blue-600 font-bold hover:underline"
          >
            {isLogin ? '立即注册' : '立即登录'}
          </button>
        </p>
      </div>
    </main>
  );
}