import { Button, IconButton, Input } from '@chakra-ui/react';
// import { SearchIcon } from '@chakra-ui/icons'


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Input placeholder='Digite aqui a especialidade ou nome do profissional' size='lg' color='orange' _placeholder={{ opacity: 0.4, color: 'inherit' }} />
        <Button colorScheme='orange'>
          {/* <IconButton aria-label='Search database' icon={<SearchIcon />} /> */}
          Button
        </Button>
      </div>
    </div>
  );
}
