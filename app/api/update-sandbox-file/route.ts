import { NextRequest, NextResponse } from 'next/server';

declare global {
  var activeSandbox: any;
  var activeSandboxProvider: any;
}

const MAX_FILE_SIZE = 200_000;
const SAFE_PROJECT_PATH = /^(?!\/)(?!.*(?:^|\/)\.\.(?:\/|$))[a-zA-Z0-9_@./-]+$/;

export async function POST(request: NextRequest) {
  try {
    const { path, content } = await request.json();

    if (typeof path !== 'string' || !SAFE_PROJECT_PATH.test(path)) {
      return NextResponse.json({ success: false, error: 'Invalid project file path.' }, { status: 400 });
    }
    if (typeof content !== 'string') {
      return NextResponse.json({ success: false, error: 'File content must be text.' }, { status: 400 });
    }
    if (Buffer.byteLength(content, 'utf8') > MAX_FILE_SIZE) {
      return NextResponse.json({ success: false, error: 'File is too large for the browser editor.' }, { status: 413 });
    }

    const writer = global.activeSandboxProvider || global.activeSandbox;
    if (!writer) {
      return NextResponse.json({ success: false, error: 'No active sandbox.' }, { status: 404 });
    }

    if (typeof writer.writeFile === 'function') {
      await writer.writeFile(path, content);
    } else if (typeof writer.writeFiles === 'function') {
      const fullPath = path.startsWith('/') ? path : `/vercel/sandbox/${path}`;
      await writer.writeFiles([{ path: fullPath, content: Buffer.from(content, 'utf8') }]);
    } else {
      return NextResponse.json({ success: false, error: 'Sandbox file editing is unavailable.' }, { status: 501 });
    }

    return NextResponse.json({ success: true, path });
  } catch (error) {
    console.error('[update-sandbox-file] Error:', error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
