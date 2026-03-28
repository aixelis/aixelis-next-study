'use client';
import React, { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const ADMIN_PASSWORD = '888'; 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchData(); 
    } else {
      alert('❌ 密碼錯誤！');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/appointments');
      const json = await res.json();
      if (json.success) {
        setAppointments(json.data);
      } else {
        alert('獲取數據失敗: ' + json.error);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // === 新增：处理订单的功能 ===
  const handleResolve = async (id: number, name: string) => {
    // 弹窗再次确认，防止手滑按错
    const isConfirmed = window.confirm(`確定已經聯絡了客戶 ${name} 並處理完畢了嗎？\n(此操作將從列表中移除該訂單)`);
    
    if (isConfirmed) {
      try {
        const res = await fetch('/api/admin/appointments', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        });
        const json = await res.json();
        
        if (json.success) {
          // 处理成功后，重新拉取最新数据，表格会自动更新
          fetchData();
        } else {
          alert('處理失敗: ' + json.error);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center font-sans">
        <form onSubmit={handleLogin} className="bg-white p-10 rounded-2xl shadow-2xl w-96">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-gray-800">💼 老闆專屬後台</h2>
            <p className="text-gray-500 text-sm mt-2">請輸入管理員密碼以查看訂單</p>
          </div>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="請輸入密碼" className="w-full p-4 border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-blue-500 focus:outline-none text-center tracking-widest" />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-4 rounded-lg transition">安全登入</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-800">📋 預約訂單管理中心</h1>
            <p className="text-gray-500 mt-2">共 {appointments.length} 筆待處理預約</p>
          </div>
          <button onClick={fetchData} className="bg-white border-2 border-gray-200 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-bold transition shadow-sm flex items-center gap-2">
            🔄 重新整理
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center text-gray-500 font-bold animate-pulse">數據加載中...</div>
          ) : (
            <table className="w-full text-left border-collapse min-w-max">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="p-4 font-bold text-sm">訂單編號</th>
                  <th className="p-4 font-bold text-sm">提交時間 (UTC)</th>
                  <th className="p-4 font-bold text-sm">客戶姓名</th>
                  <th className="p-4 font-bold text-sm">聯絡電話</th>
                  <th className="p-4 font-bold text-sm">所需服務</th>
                  <th className="p-4 font-bold text-sm">期望日期</th>
                  <th className="p-4 font-bold text-sm">客戶留言</th>
                  {/* 新增了操作列 */}
                  <th className="p-4 font-bold text-sm text-center">狀態操作</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt, index) => (
                  <tr key={apt.id} className={`border-t border-gray-100 hover:bg-blue-50 transition ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="p-4 text-gray-500">#{apt.id}</td>
                    <td className="p-4 text-gray-600 text-sm">{apt.created_at}</td>
                    <td className="p-4 font-bold text-gray-800">{apt.name}</td>
                    <td className="p-4 font-bold text-blue-600">
                      <a href={`tel:${apt.phone}`}>{apt.phone}</a>
                    </td>
                    <td className="p-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">{apt.service}</span>
                    </td>
                    <td className="p-4 text-gray-800 font-bold">{apt.date}</td>
                    <td className="p-4 text-gray-600 max-w-xs truncate" title={apt.description}>
                      {apt.description || '無'}
                    </td>
                    {/* 新增的完成按钮 */}
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => handleResolve(apt.id, apt.name)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition"
                      >
                        ✅ 標記完成
                      </button>
                    </td>
                  </tr>
                ))}
                {appointments.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-16 text-center text-gray-400">
                      <div className="text-4xl mb-4">🎉</div>
                      <div className="text-lg font-bold">太棒了！所有訂單都已處理完畢</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}