import { Badge, Box, VStack, HStack, Image, Button, Card, CardBody, CardFooter, CardHeader, Stack } from "@chakra-ui/react"

export default async function ArticleList() {

  const apiUrl = new URL('http://localhost:8000/api/v1/article');
  // const apiUrl = new URL(`${process.env.API_URL}/api/v1/article`);
  let articles: { title: string; summary: string }[] = await fetch(apiUrl).then((response) => response.json());
  return (
    <Box className="min-h-screen py-1 flex justify-center" w="75%">
      <VStack spacing={2}>
        {articles.map((article: { title: string; summary: string }, index) => (
          <Card direction="row" overflow="hidden" maxW="xl">
            <Image
              objectFit="cover"
              maxW="200px"
              src="https://picsum.photos/200/300"
              alt="Caffe Latte"
            />
            <Box>
              <CardHeader mb="2"> { article.title } </CardHeader>
              <CardBody>
                <Box>
                  { article.summary }
                </Box>
                <HStack mt="4">
                  <Badge colorScheme="green">#tag1</Badge>
                  <Badge colorScheme="blue">#tag2</Badge>
                </HStack>
              </CardBody>
              <CardFooter>
                <Button colorScheme="orange" variant="outline">Ler o artigo</Button>
              </CardFooter>
            </Box>
          </Card>
        ))}
      </VStack>
    </Box>
  );
}
