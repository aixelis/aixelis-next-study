export const runtime = 'edge'; // 必须带上这一句
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // 连接 D1 数据库
    const db = process.env.DB as any;
    if (!db) {
      return NextResponse.json({ success: false, error: '数据库未连接' });
    }

    // 从 appointments 表中拉取所有数据，按时间倒序排列（最新的在最上面）
    const { results } = await db.prepare("SELECT * FROM appointments ORDER BY created_at DESC").all();

    // 把数据发给前端
    return NextResponse.json({ success: true, data: results });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}