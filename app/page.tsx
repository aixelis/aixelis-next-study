'use client';

import { useState } from 'react';

export default function Home() {
  // === 登录逻辑部分 ===
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.success) {
      setMessage('✅ 登录成功');
    } else {
      setMessage('❌ 登录失败: ' + data.error);
    }
  };

  // === 页面渲染部分 ===
  return (
    <main className="min-h-screen bg-gray-50">
      {/* 1. 导航栏 */}
      <nav className="p-4 bg-white shadow-sm flex justify-between items-center sticky top-0 z-50">
        <div className="text-2xl font-black text-blue-700 tracking-tighter">AIXELIS</div>
        <a href="tel:626-252-4457" className="bg-red-500 text-white px-4 py-2 rounded-full animate-pulse font-bold">
          📞 626-252-4457
        </a>
      </nav>

      {/* 2. 老网页的 Hero 海报区 */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">专业 HVAC & 电力服务</h2>
        <p className="text-xl text-gray-300 mb-8">洛杉矶资深团队 | 暖通空调 • 电工 • 管道工程</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-bold transition">立即预约</button>
          <button className="border border-white hover:bg-white hover:text-slate-900 px-8 py-3 rounded-lg font-bold transition">了解更多</button>
        </div>
      </section>

      {/* 3. 老网页的服务板块 */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-4xl mb-4">❄️</div>
          <h3 className="text-xl font-bold mb-2">暖通空调 (HVAC)</h3>
          <p className="text-gray-600">空调安装、热泵维修、通风系统清洁，确保您的家庭四季如春。</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="text-xl font-bold mb-2">电力服务</h3>
          <p className="text-gray-600">电路升级、面板维修、照明安装。持证电工，安全第一。</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-4xl mb-4">🔧</div>
          <h3 className="text-xl font-bold mb-2">管道工程</h3>
          <p className="text-gray-600">漏水修复、热水器更换、下水道疏通。快速上门，彻底解决问题。</p>
        </div>
      </section>

      {/* 4. 会员登录区 (自带逻辑) */}
      <section className="bg-blue-600 py-20 px-6">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-10 shadow-2xl">
          <h2 className="text-2xl font-black text-center text-gray-800 mb-6">AIXELIS 会员登录</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">用户名</label>
              <input 
                type="text" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="请输入用户名" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">密码</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="请输入密码" 
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition">
              立即登录
            </button>
          </form>
          {message && (
            <div className={`mt-4 p-3 rounded text-center font-bold ${message.includes('成功') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </div>
          )}
        </div>
      </section>

      <footer className="py-10 text-center text-gray-400 text-sm">
        © 2026 AIXELIS Home Services. All Rights Reserved.
      </footer>
    </main>
  );
}