import { Box, Heading, Text } from '@chakra-ui/react'


interface Article {
  title: string,
  summary: string,
  content: string,
  published: boolean,
  created_at: number,
  id: number
}

export default async function Article({
    params,
  }: {
    params: Promise<{ articleId: string }>
  }) {
    const artigo = (await params).articleId
    const apiUrl = new URL(`http://localhost:8000/api/v1/article/${artigo}`);
  // const apiUrl = new URL(`${process.env.API_URL}/api/v1/article`);
  let article: Article = await fetch(apiUrl).then((response) => response.json());


    return (
      <Box p={5} width="80%" bg="white" borderRadius="md" boxShadow="md">
        <Heading as="h1" size="xl" mb={4}>{article.title}</Heading>
        <Text fontSize="sm" color="gray.500" mb={4}>
          Publicado em: {new Date(article.created_at).toLocaleDateString()}
        </Text>
        <Text>{article.content}</Text>
      </Box>
    )
  }
