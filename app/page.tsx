'use client';

import React, { useState } from 'react';

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
    footer: '© 2026 AIXELIS Home Services. 保留所有權利。',
    modalTitle: '預約服務',
    nameLabel: '您的姓名',
    phoneLabel: '聯絡電話',
    serviceLabel: '需要什麼服務？',
    serviceOptions: ['暖通空調 (HVAC)', '電力維修', '管道工程', '其他綜合服務'],
    dateLabel: '期望日期',
    descLabel: '簡述您的問題',
    descPlaceholder: '請簡單描述您遇到的情況...',
    cancelBtn: '取消',
    submitBtn: '確認送出',
    submittingBtn: '送出中...',
    bookSuccess: '✅ 預約已成功送出！我們將盡快與您聯絡。'
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
    footer: '© 2026 AIXELIS Home Services. All Rights Reserved.',
    modalTitle: 'Book a Service',
    nameLabel: 'Your Name',
    phoneLabel: 'Phone Number',
    serviceLabel: 'Service Needed?',
    serviceOptions: ['HVAC', 'Electrical', 'Plumbing', 'Other'],
    dateLabel: 'Preferred Date',
    descLabel: 'Brief Description',
    descPlaceholder: 'Please briefly describe your issue...',
    cancelBtn: 'Cancel',
    submitBtn: 'Submit Request',
    submittingBtn: 'Submitting...',
    bookSuccess: '✅ Request successfully submitted! We will contact you soon.'
  }
};

export default function Home() {
  const [lang, setLang] = useState<'zh-TW' | 'en'>('zh-TW');
  const t = translations[lang];

  // 登录逻辑
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

  // 预约表单逻辑
  const [showModal, setShowModal] = useState(false);
  const [bookMessage, setBookMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 表单的具体内容变量
  const [bookName, setBookName] = useState('');
  const [bookPhone, setBookPhone] = useState('');
  const [bookService, setBookService] = useState('暖通空調 (HVAC)');
  const [bookDate, setBookDate] = useState('');
  const [bookDesc, setBookDesc] = useState('');

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 发送数据到我们刚才写的后端 API
    const res = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name: bookName, 
        phone: bookPhone, 
        service: bookService, 
        date: bookDate, 
        description: bookDesc 
      })
    });

    const data = await res.json();
    setIsSubmitting(false);

    if (data.success) {
      setBookMessage(t.bookSuccess);
      setTimeout(() => {
        setShowModal(false);
        setBookMessage('');
        // 清空表单以便下次填写
        setBookName(''); setBookPhone(''); setBookDate(''); setBookDesc('');
      }, 2500); 
    } else {
      alert("提交失敗: " + data.error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 font-sans relative">
      <nav className="p-4 bg-white shadow-sm flex justify-between items-center sticky top-0 z-40">
        <div className="text-2xl font-black text-blue-700 tracking-tighter">AIXELIS</div>
        <div className="flex gap-3 items-center">
          <button onClick={() => setLang(lang === 'zh-TW' ? 'en' : 'zh-TW')} className="text-sm font-bold text-gray-600 border-2 border-gray-200 px-3 py-1 rounded-full hover:bg-gray-100 transition">
            🌐 {t.langBtn}
          </button>
          <a href="tel:626-252-4457" className="bg-red-500 text-white px-4 py-2 rounded-full animate-pulse font-bold text-sm md:text-base hidden sm:block">
            {t.navCall}
          </a>
        </div>
      </nav>

      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">{t.heroTitle}</h2>
        <p className="text-xl text-gray-300 mb-8">{t.heroSub}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-bold transition shadow-lg">
            {t.bookBtn}
          </button>
          <button className="border border-white hover:bg-white hover:text-slate-900 px-8 py-3 rounded-lg font-bold transition">{t.learnBtn}</button>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="text-4xl mb-4">❄️</div><h3 className="text-xl font-bold mb-2">{t.hvacTitle}</h3><p className="text-gray-600">{t.hvacDesc}</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="text-4xl mb-4">⚡</div><h3 className="text-xl font-bold mb-2">{t.elecTitle}</h3><p className="text-gray-600">{t.elecDesc}</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="text-4xl mb-4">🔧</div><h3 className="text-xl font-bold mb-2">{t.plumbTitle}</h3><p className="text-gray-600">{t.plumbDesc}</p>
        </div>
      </section>

      <section className="bg-blue-600 py-20 px-6">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-10 shadow-2xl">
          <h2 className="text-2xl font-black text-center text-gray-800 mb-6">{t.loginTitle}</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div><label className="block text-sm font-bold text-gray-700 mb-1">{t.userLabel}</label><input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={t.userPlaceholder} /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-1">{t.passLabel}</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={t.passPlaceholder} /></div>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition">{t.loginBtn}</button>
          </form>
          {message && <div className={`mt-4 p-3 rounded text-center font-bold ${message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message}</div>}
        </div>
      </section>

      <footer className="py-10 text-center text-gray-400 text-sm">{t.footer}</footer>

      {/* 5. 预约表单弹窗 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all relative">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{t.modalTitle}</h2>
            
            {bookMessage ? (
              <div className="bg-green-100 text-green-700 p-6 rounded-xl text-center font-bold text-lg">{bookMessage}</div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">{t.nameLabel}</label>
                    <input type="text" value={bookName} onChange={e=>setBookName(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">{t.phoneLabel}</label>
                    <input type="tel" value={bookPhone} onChange={e=>setBookPhone(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">{t.serviceLabel}</label>
                  <select value={bookService} onChange={e=>setBookService(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                    {t.serviceOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">{t.dateLabel}</label>
                  <input type="date" value={bookDate} onChange={e=>setBookDate(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">{t.descLabel}</label>
                  <textarea value={bookDesc} onChange={e=>setBookDesc(e.target.value)} rows={3} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none" placeholder={t.descPlaceholder}></textarea>
                </div>
                
                <div className="flex gap-4 mt-6">
                  <button type="button" onClick={() => setShowModal(false)} disabled={isSubmitting} className="w-1/3 bg-gray-100 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-200 transition">
                    {t.cancelBtn}
                  </button>
                  <button type="submit" disabled={isSubmitting} className="w-2/3 bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition shadow-md disabled:bg-orange-300">
                    {isSubmitting ? t.submittingBtn : t.submitBtn}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}