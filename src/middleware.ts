import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('certus_token')?.value;

  // Protege as rotas que não são o login nem a área pública
  if (request.nextUrl.pathname.startsWith('/dashboard') || 
      request.nextUrl.pathname.startsWith('/academy') || 
      request.nextUrl.pathname.startsWith('/wallet') || 
      request.nextUrl.pathname.startsWith('/leads') || 
      request.nextUrl.pathname.startsWith('/profile')) {
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Se o usuário já está logado, impede de acessar o login
  if (request.nextUrl.pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/academy/:path*',
    '/wallet/:path*',
    '/leads/:path*',
    '/profile/:path*',
    '/login'
  ],
}
