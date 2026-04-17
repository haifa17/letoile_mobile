import { NextResponse } from 'next/server'

// POST - Déconnexion
export async function POST() {
  const response = NextResponse.json({ success: true })
  
  // Supprimer le cookie
  response.cookies.delete('token')
  
  return response
}