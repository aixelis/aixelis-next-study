import { NextResponse } from 'next/server';

// 这里的 env 会自动获取到你在 Cloudflare 后台绑定的 DB
export const runtime = 'edge'; // 必须开启 Edge 运行时才能访问 D1

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    // 获取 Cloudflare 注入的环境变量
    const { DB } = (process.env as any); 

    // 🔍 真正的 SQL 查询逻辑
    const user = await DB.prepare(
      "SELECT * FROM members WHERE username = ? AND password = ?"
    ).bind(username, password).first();

    if (user) {
      return NextResponse.json({
        success: true,
        message: "登录成功！欢迎回来",
        user: { username: user.username }
      });
    }

    return NextResponse.json({
      success: false,
      message: "数据库中未找到该账号或密码错误"
    }, { status: 401 });

  } catch (error: any) {
    console.error('Database Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: "数据库连接失败: " + error.message 
    }, { status: 500 });
  }
}