import { Grid, GridItem } from '@chakra-ui/react'

export default function Footer() {
    return (
        <>
            <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                <GridItem>Logo</GridItem>
                <GridItem>Endereço</GridItem>
                <GridItem>Contato</GridItem>
                <GridItem>Redes Sociais</GridItem>
            </Grid>
        </>
    )
}
