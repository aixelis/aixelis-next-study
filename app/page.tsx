'use client';

import React, { useState } from 'react';

// 定義所有的翻譯文本
const translations = {
  'zh-TW': {
    navCall: '📞 626-252-4457',
    langBtn: 'English',
    heroTitle: '專業 HVAC & 電力服務',
    heroSub: '洛杉磯資深團隊 | 暖通空調 • 電工 • 管道工程',
    bookBtn: '立即預約',
    learnBtn: '了解更多',
    hvacTitle: '暖通空調 (HVAC)',
    hvacDesc: '空調安裝、熱泵維修、通風系統清潔，確保您的家庭四季如春。',
    elecTitle: '電力服務',
    elecDesc: '電路升級、面板維修、照明安裝。持證電工，安全第一。',
    plumbTitle: '管道工程',
    plumbDesc: '漏水修復、熱水器更換、下水道疏通。快速上門，徹底解決問題。',
    loginTitle: 'AIXELIS 會員登入',
    userLabel: '使用者名稱',
    userPlaceholder: '請輸入使用者名稱',
    passLabel: '密碼',
    passPlaceholder: '請輸入密碼',
    loginBtn: '立即登入',
    loginSuccess: '✅ 登入成功',
    loginFail: '❌ 登入失敗: ',
    footer: '© 2026 AIXELIS Home Services. 保留所有權利。'
  },
  'en': {
    navCall: '📞 626-252-4457',
    langBtn: '繁體中文',
    heroTitle: 'Expert HVAC & Electrical Services',
    heroSub: 'Experienced LA Team | HVAC • Electrical • Plumbing',
    bookBtn: 'Book Now',
    learnBtn: 'Learn More',
    hvacTitle: 'HVAC Services',
    hvacDesc: 'AC installation, heat pump repair, and ventilation cleaning to keep your home comfortable year-round.',
    elecTitle: 'Electrical Services',
    elecDesc: 'Circuit upgrades, panel repairs, lighting installation. Licensed electricians, safety first.',
    plumbTitle: 'Plumbing Services',
    plumbDesc: 'Leak repair, water heater replacement, drain cleaning. Fast service, problems solved.',
    loginTitle: 'AIXELIS Member Login',
    userLabel: 'Username',
    userPlaceholder: 'Enter your username',
    passLabel: 'Password',
    passPlaceholder: 'Enter your password',
    loginBtn: 'Login',
    loginSuccess: '✅ Login Successful',
    loginFail: '❌ Login Failed: ',
    footer: '© 2026 AIXELIS Home Services. All Rights Reserved.'
  }
};

export default function Home() {
  // === 語言切換邏輯 ===
  const [lang, setLang] = useState<'zh-TW' | 'en'>('zh-TW');
  const t = translations[lang]; // 根據當前語言獲取對應的文本

  // === 登入邏輯部分 ===
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
      setMessage(t.loginSuccess);
    } else {
      setMessage(t.loginFail + (data.error || ''));
    }
  };

  // === 頁面渲染部分 ===
  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      {/* 1. 導航欄 (加入語言切換按鈕) */}
      <nav className="p-4 bg-white shadow-sm flex justify-between items-center sticky top-0 z-50">
        <div className="text-2xl font-black text-blue-700 tracking-tighter">AIXELIS</div>
        <div className="flex gap-3 items-center">
          {/* 語言切換按鈕 */}
          <button 
            onClick={() => setLang(lang === 'zh-TW' ? 'en' : 'zh-TW')}
            className="text-sm font-bold text-gray-600 border-2 border-gray-200 px-3 py-1 rounded-full hover:bg-gray-100 transition"
          >
            🌐 {t.langBtn}
          </button>
          <a href="tel:626-252-4457" className="bg-red-500 text-white px-4 py-2 rounded-full animate-pulse font-bold text-sm md:text-base">
            {t.navCall}
          </a>
        </div>
      </nav>

      {/* 2. 海報區 */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">{t.heroTitle}</h2>
        <p className="text-xl text-gray-300 mb-8">{t.heroSub}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-bold transition">{t.bookBtn}</button>
          <button className="border border-white hover:bg-white hover:text-slate-900 px-8 py-3 rounded-lg font-bold transition">{t.learnBtn}</button>
        </div>
      </section>

      {/* 3. 服務板塊 */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-4xl mb-4">❄️</div>
          <h3 className="text-xl font-bold mb-2">{t.hvacTitle}</h3>
          <p className="text-gray-600">{t.hvacDesc}</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="text-xl font-bold mb-2">{t.elecTitle}</h3>
          <p className="text-gray-600">{t.elecDesc}</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-4xl mb-4">🔧</div>
          <h3 className="text-xl font-bold mb-2">{t.plumbTitle}</h3>
          <p className="text-gray-600">{t.plumbDesc}</p>
        </div>
      </section>

      {/* 4. 會員登入區 */}
      <section className="bg-blue-600 py-20 px-6">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-10 shadow-2xl">
          <h2 className="text-2xl font-black text-center text-gray-800 mb-6">{t.loginTitle}</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">{t.userLabel}</label>
              <input 
                type="text" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder={t.userPlaceholder} 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">{t.passLabel}</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder={t.passPlaceholder} 
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition">
              {t.loginBtn}
            </button>
          </form>
          {message && (
            <div className={`mt-4 p-3 rounded text-center font-bold ${message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </div>
          )}
        </div>
      </section>

      <footer className="py-10 text-center text-gray-400 text-sm">
        {t.footer}
      </footer>
    </main>
  );
}