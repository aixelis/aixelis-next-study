export const runtime = 'edge';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. 接收前端传来的表单数据
    const data = await request.json();
    const { name, phone, service, date, description } = data;

    // 2. 连接 D1 数据库
    const db = process.env.DB as any;
    if (!db) {
      return NextResponse.json({ success: false, error: '数据库未连接' });
    }

    // 3. 将数据插入到 appointments 表中
    await db.prepare(
      "INSERT INTO appointments (name, phone, service, date, description) VALUES (?, ?, ?, ?, ?)"
    ).bind(name, phone, service, date, description).run();

    // ==========================================
    // 4. 新增：发送 Telegram 通知
    // ==========================================
    const BOT_TOKEN = "8791184896:AAH6jq0X9B42y3D805NHtBiWJ7w0HU0mWIA"; // <--- 换成你的 Token，保留双引号
    const CHAT_ID = "5556784756";    // <--- 换成你的 Chat ID，保留双引号

    // 组合你要收到的消息内容
    const message = `🔥 收到新预约！\n\n👤 姓名：${name}\n📞 电话：${phone}\n🛠️ 服务：${service}\n📅 日期：${date}\n📝 留言：${description || '无'}`;

    // 呼叫 Telegram API 发送消息
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      })
    });
    // ==========================================

    // 5. 返回成功信息给前端
    return NextResponse.json({ success: true });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}