import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  const { query } = await request.json();
  console.log('CHEGUEI AQUI')
//   const response = await axios.get(`https://api.externa.com/search?q=${query}`);
  const response = await axios.get('http://localhost:8000/api/v1/search');
  console.log('Search results:', response.data);
  return NextResponse.json(response.data);
}
