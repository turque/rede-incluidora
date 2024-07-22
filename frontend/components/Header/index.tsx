import { UserAvatar } from "@/components/ui";
import { Grid, GridItem, Text } from '@chakra-ui/react'

export default function Header() {
    return (
        <>
            <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                <GridItem colSpan={2} color={'#F0790A'} >
                    <Text textAlign={[ 'center', 'left' ]} as='b'>Rede Incluidora</Text>
                </GridItem>
                <GridItem colStart={5}>
                    <UserAvatar name='Arnaldo Davino Godinho Turque' src='https://bit.ly/broken-link'/>
                </GridItem>
            </Grid>
        </>
    )
}
