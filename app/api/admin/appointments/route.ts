export const runtime = 'edge';
import { NextResponse } from 'next/server';

// 1. 获取所有订单 (原来的功能)
export async function GET(request: Request) {
  try {
    const db = process.env.DB as any;
    if (!db) return NextResponse.json({ success: false, error: '数据库未连接' });

    const { results } = await db.prepare("SELECT * FROM appointments ORDER BY created_at DESC").all();
    return NextResponse.json({ success: true, data: results });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

// 2. 新增：删除已处理的订单
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const db = process.env.DB as any;
    if (!db) return NextResponse.json({ success: false, error: '数据库未连接' });

    // 告诉数据库删掉对应 ID 的记录
    await db.prepare("DELETE FROM appointments WHERE id = ?").bind(id).run();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}