
export const runtime = 'edge';
import { NextResponse } from 'next/server';
export async function POST(request: Request) {
  try {
    // 1. 接收前端传来的表单数据
    const data = await request.json();
    const { name, phone, service, date, description } = data;

    // 2. 连接 D1 数据库 (使用 any 绕过类型检查)
    const db = process.env.DB as any;

    if (!db) {
      return NextResponse.json({ success: false, error: '数据库未连接' });
    }

    // 3. 将数据插入到 appointments 表中
    await db.prepare(
      "INSERT INTO appointments (name, phone, service, date, description) VALUES (?, ?, ?, ?, ?)"
    ).bind(name, phone, service, date, description).run();

    // 4. 返回成功信息给前端
    return NextResponse.json({ success: true });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}