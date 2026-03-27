import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'; // 必须指定 edge 运行时

export async function GET(request: NextRequest) {
  try {
    // 这里的 'DB' 必须和你在 Cloudflare 后台设置的 Variable name 一致
    const db = process.env.DB as unknown as D1Database;

    if (!db) {
      return NextResponse.json({ error: "数据库绑定未找到，请检查 Cloudflare 后台设置" }, { status: 500 });
    }

    // 执行一个简单的查询测试
    // 假设你的表名是 users，如果还没建表，可以改写成：SELECT 1
    const { results } = await db.prepare("SELECT * FROM users LIMIT 5").all();

    return NextResponse.json({ 
      success: true, 
      message: "数据库连接成功！",
      data: results 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}