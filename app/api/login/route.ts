import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    const db = process.env.DB as any;

    // 查询用户
    const user = await db.prepare("SELECT * FROM users WHERE username = ? AND password = ?")
      .bind(username, password)
      .first();

    if (user) {
      return NextResponse.json({ success: true, message: "登录成功" });
    } else {
      return NextResponse.json({ success: false, message: "账号或密码错误" }, { status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}