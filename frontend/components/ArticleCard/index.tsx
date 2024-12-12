import { Box, Heading, Text } from "@chakra-ui/react";

const ArticleCard = ({ title, summary }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      className="bg-white shadow-md"
    >
      <Heading as="h3" size="md" mb="4">
        {title}
      </Heading>
      <Text>
        {summary}
      </Text>
    </Box>
  );
};

export default ArticleCard;
