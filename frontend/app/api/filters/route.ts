import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
	// Substitua pela URL da API externa que você deseja consultar
	const externalApiUrl = 'http://localhost:8000/api/v1/search/filters';

	// Faça a requisição para a API externa
	const response = await axios.get(externalApiUrl);

	// Formate os dados recebidos da API externa conforme necessário
	const formattedData = {
	  city: response.data.city || [],
	  insurances: response.data.insurances || [],
	  specializations: response.data.specializations || []
	};

	// Envie os dados formatados como resposta
	return NextResponse.json(formattedData);
  } catch (error) {
	console.error('Error fetching filters data:', error);
	return NextResponse.json({ message: 'Error fetching filters data' }, { status: 500 });
  }
}
