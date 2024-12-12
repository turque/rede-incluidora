import React from 'react';
import { Box, Wrap, WrapItem, Link } from '@chakra-ui/react';

interface FilterCardProps {
  items: { text: string, url: string }[];
}

const FilterCard: React.FC<FilterCardProps> = ({ items }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <Wrap>
        {items.map((item, index) => (
          <WrapItem key={index}>
            <Link href={item.url} mx={2}>
              {item.text}
            </Link>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

export default FilterCard;
