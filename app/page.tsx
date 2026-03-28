'use client';

import React, { useState } from 'react';

// 定義所有的翻譯文本 (完全保留之前的內容，新增了關於我們)
const translations = {
  'zh-TW': {
    navCall: '📞 626-252-4457',
    langBtn: 'English',
    heroTitle: '專業 HVAC & 電力服務',
    heroSub: '洛杉磯資深團隊 | 暖通空調 • 電工 • 管道工程',
    bookBtn: '立即預約',
    learnBtn: '了解更多',
    aboutTitle: '為什麼選擇 AIXELIS？',
    aboutDesc: '我們是在洛杉磯深耕多年的專業維修團隊。擁有加州政府認證執照，百萬級商業保險，保證您的每一次維修都安全、合規、無後顧之憂。無論是深夜的空調故障，還是突發的漏水斷電，我們承諾為您提供最迅速、最透明的報價與服務。',
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
    aboutTitle: 'Why Choose AIXELIS?',
    aboutDesc: 'We are a highly experienced home services team rooted in Los Angeles. Fully licensed and insured, we guarantee that every repair is safe, compliant, and worry-free. Whether it’s a late-night AC breakdown or a sudden plumbing emergency, we promise fast response times and transparent pricing.',
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

  // 登入邏輯
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

  // 預約表單邏輯
  const [showModal, setShowModal] = useState(false);
  const [bookMessage, setBookMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [bookName, setBookName] = useState('');
  const [bookPhone, setBookPhone] = useState('');
  const [bookService, setBookService] = useState('暖通空調 (HVAC)');
  const [bookDate, setBookDate] = useState('');
  const [bookDesc, setBookDesc] = useState('');

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name: bookName, phone: bookPhone, service: bookService, date: bookDate, description: bookDesc 
      })
    });

    const data = await res.json();
    setIsSubmitting(false);

    if (data.success) {
      setBookMessage(t.bookSuccess);
      setTimeout(() => {
        setShowModal(false);
        setBookMessage('');
        setBookName(''); setBookPhone(''); setBookDate(''); setBookDesc('');
      }, 2500); 
    } else {
      alert("提交失敗: " + data.error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 font-sans relative pb-10">
      {/* 1. 導航欄 */}
      <nav className="p-4 bg-white shadow-md flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-2">
          {/* 加入一個簡單的藍色 Logo 圖示 */}
          <div className="bg-blue-600 text-white p-2 rounded-lg font-black text-xl leading-none">AX</div>
          <div className="text-2xl font-black text-gray-800 tracking-tighter">AIXELIS</div>
        </div>
        <div className="flex gap-3 items-center">
          <button onClick={() => setLang(lang === 'zh-TW' ? 'en' : 'zh-TW')} className="text-sm font-bold text-gray-600 border-2 border-gray-200 px-3 py-1 rounded-full hover:bg-gray-100 transition">
            🌐 {t.langBtn}
          </button>
          <a href="tel:626-252-4457" className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full animate-pulse font-bold text-sm md:text-base hidden sm:block shadow-lg transition">
            {t.navCall}
          </a>
        </div>
      </nav>

      {/* 2. 海報區 (加入暗色背景圖) */}
      <section 
        className="relative text-white py-32 px-6 text-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581094288338-2314dddb31b5?auto=format&fit=crop&q=80&w=2000')" }}
      >
        {/* 黑色半透明遮罩，讓文字更清晰 */}
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">{t.heroTitle}</h2>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 font-medium drop-shadow-md">{t.heroSub}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-500 px-10 py-4 rounded-xl font-bold text-lg transition shadow-2xl transform hover:-translate-y-1">
              {t.bookBtn}
            </button>
            <a href="#about" className="bg-white/20 hover:bg-white hover:text-gray-900 backdrop-blur-sm border border-white px-10 py-4 rounded-xl font-bold text-lg transition shadow-2xl transform hover:-translate-y-1">
              {t.learnBtn}
            </a>
          </div>
        </div>
      </section>

      {/* 3. 關於我們 (信任背書區) */}
      <section id="about" className="max-w-5xl mx-auto py-16 px-6 text-center">
        <h2 className="text-3xl font-black text-gray-800 mb-6">{t.aboutTitle}</h2>
        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
          {t.aboutDesc}
        </p>
        <div className="flex justify-center gap-8 mt-8 flex-wrap">
          <div className="flex items-center gap-2 font-bold text-gray-700"><span className="text-green-500 text-2xl">✓</span> 加州執照</div>
          <div className="flex items-center gap-2 font-bold text-gray-700"><span className="text-green-500 text-2xl">✓</span> 百萬保險</div>
          <div className="flex items-center gap-2 font-bold text-gray-700"><span className="text-green-500 text-2xl">✓</span> 透明報價</div>
          <div className="flex items-center gap-2 font-bold text-gray-700"><span className="text-green-500 text-2xl">✓</span> 快速響應</div>
        </div>
      </section>

      {/* 4. 服務板塊 (圖文卡片) */}
      <section className="max-w-7xl mx-auto py-10 px-6 grid md:grid-cols-3 gap-8">
        {/* HVAC 卡片 */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 flex flex-col">
          <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590496736636-2244243a88cb?auto=format&fit=crop&q=80&w=800')" }}></div>
          <div className="p-8 flex-1">
            <h3 className="text-2xl font-black mb-3 text-gray-800">{t.hvacTitle}</h3>
            <p className="text-gray-600 leading-relaxed">{t.hvacDesc}</p>
          </div>
        </div>
        
        {/* 電力 卡片 */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 flex flex-col">
          <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=800')" }}></div>
          <div className="p-8 flex-1">
            <h3 className="text-2xl font-black mb-3 text-gray-800">{t.elecTitle}</h3>
            <p className="text-gray-600 leading-relaxed">{t.elecDesc}</p>
          </div>
        </div>

        {/* 管道 卡片 */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 flex flex-col">
          <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=800')" }}></div>
          <div className="p-8 flex-1">
            <h3 className="text-2xl font-black mb-3 text-gray-800">{t.plumbTitle}</h3>
            <p className="text-gray-600 leading-relaxed">{t.plumbDesc}</p>
          </div>
        </div>
      </section>

      {/* 5. 會員登入區 */}
      <section className="py-16 px-6 mt-10">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
          <h2 className="text-2xl font-black text-center text-gray-800 mb-6">{t.loginTitle}</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div><label className="block text-sm font-bold text-gray-700 mb-1">{t.userLabel}</label><input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition" placeholder={t.userPlaceholder} /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-1">{t.passLabel}</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition" placeholder={t.passPlaceholder} /></div>
            <button type="submit" className="w-full bg-gray-800 text-white font-bold py-4 px-4 rounded-xl hover:bg-gray-900 transition mt-2 shadow-md">{t.loginBtn}</button>
          </form>
          {message && <div className={`mt-4 p-3 rounded-xl text-center font-bold ${message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message}</div>}
        </div>
      </section>

      <footer className="py-8 text-center text-gray-400 text-sm font-medium">
        {t.footer}
      </footer>

      {/* 6. 預約表單彈窗 (完全保留) */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all relative">
            <h2 className="text-2xl font-black mb-6 text-gray-800">{t.modalTitle}</h2>
            {bookMessage ? (
              <div className="bg-green-100 text-green-700 p-6 rounded-xl text-center font-bold text-lg">{bookMessage}</div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-bold text-gray-700 mb-1">{t.nameLabel}</label><input type="text" value={bookName} onChange={e=>setBookName(e.target.value)} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div>
                  <div><label className="block text-sm font-bold text-gray-700 mb-1">{t.phoneLabel}</label><input type="tel" value={bookPhone} onChange={e=>setBookPhone(e.target.value)} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div>
                </div>
                <div><label className="block text-sm font-bold text-gray-700 mb-1">{t.serviceLabel}</label><select value={bookService} onChange={e=>setBookService(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none">{t.serviceOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}</select></div>
                <div><label className="block text-sm font-bold text-gray-700 mb-1">{t.dateLabel}</label><input type="date" value={bookDate} onChange={e=>setBookDate(e.target.value)} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div>
                <div><label className="block text-sm font-bold text-gray-700 mb-1">{t.descLabel}</label><textarea value={bookDesc} onChange={e=>setBookDesc(e.target.value)} rows={3} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none" placeholder={t.descPlaceholder}></textarea></div>
                
                <div className="flex gap-4 mt-8">
                  <button type="button" onClick={() => setShowModal(false)} disabled={isSubmitting} className="w-1/3 bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 transition">{t.cancelBtn}</button>
                  <button type="submit" disabled={isSubmitting} className="w-2/3 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition shadow-lg disabled:bg-blue-300">{isSubmitting ? t.submittingBtn : t.submitBtn}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}