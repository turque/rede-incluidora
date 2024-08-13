import { Avatar, Button, Image } from '@chakra-ui/react'
// import Image from 'next/image'

export default function Header() {
    return (
        <>
            <div>
                <Image src='/img/rede-incluidora-logo.svg' alt='Logo com uma magem de um girasol com os dizeres: rede incluidora'/>
            </div>
            <div >
                <Button colorScheme='orange' variant='ghost'>Produtos e Serviços</Button>
                <Button colorScheme='orange' variant='ghost'>Pergunte ao especialista</Button>
                <Button colorScheme='orange'>Entrar</Button>
                <Button colorScheme='orange' variant='outline'>Criar conta</Button>
            </div>
        </>
    )
}