import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // 注意：在本地开发环境下，我们先做模拟验证
    // 等部署到 Cloudflare 后，这里会改为查询 D1 数据库
    // 伪代码示例
const user = await env.DB.prepare(
  "SELECT * FROM members WHERE username = ? AND password = ?"
).bind(username, password).first();

    return NextResponse.json({
      success: false,
      message: "用户名或密码错误"
    }, { status: 401 });

  } catch (error) {
    return NextResponse.json({ success: false, message: "服务端错误" }, { status: 500 });
  }
}