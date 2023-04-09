import Head from 'next/head'
import type { NextPage } from 'next'
import { VStack, HStack, Heading, Text, Button, Input, Box, Spacer, Spinner } from '@chakra-ui/react'
import React from 'react'
import {load} from '../src/funcs'

//Components
import { NavBar } from '../src/components/NavBar'


const Contracts: NextPage = () =>{

    const [contracts, setContracts] = React.useState<any[]>([]);
    const [contract, setContract] = React.useState<any>(null);
    const [addressAccount, setAddresAccount] = React.useState<any>(null);
    const [refresh, setRefresh] = React.useState<boolean>(true);

    const handleDone = async (id:number) =>{
        await contract.toggleDone(id,{from: addressAccount});
        setRefresh(true);
    };
      //React useEffect
    React.useEffect(() => {
        if(!refresh) return;
        setRefresh(false);
        load().then((e) => {
            setAddresAccount(e.addressAccount);
            console.log('Account', e.addressAccount);
            setContracts(e.contracts);
            console.log('Contract:',e.contracts);
            setContract(e.todoContract);
            console.log('Contracts:', e.todoContract);
        });
    });

    const tab = <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>;

    return(
        <VStack>
            <Head>
                <title>CSolution</title>
                <meta name='description' content='Csolution' />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        
            <HStack w='full'>
                <Spacer/>
                    <VStack>
                        < NavBar />
                        <Text>{tab}</Text>
                        <Text>{tab}</Text>  
                        <Text>CSolution</Text>
                        {
                            contracts == null ? <Spinner/>
                            : contracts.map((contract, idx) =>
                                !contract[9] ?
                                <HStack key={idx} w='md' bg='gray.100' borderRadius={7}>
                                    <Box w='5px' />
                                    <Text>{contract[6]}</Text>
                                    <Spacer />
                                    <Box w='15px'/>
                                    <Button bg='green.300'>DONE</Button>
                                    </HStack> : null
                            )
                        }
                        <Box h='10px'/>
                        <Text>Contratos en ejecucion</Text>
                        {
                            contracts == null ? <Spinner/>
                            : contracts.map((contract, idx) =>
                                contract[9] ?
                                <HStack key={idx} w='md' bg='gray.100' borderRadius={7}>
                                <Box w='5px' />
                                <Text>{contract[6]}</Text>
                                <Spacer />
                                <Box w='15px'/>
                                <Button bg='red.300' onClick={ () => handleDone(contract[0].toNumber())}>UNDONE</Button>
                                </HStack> : null
                            ) 
                        }
                    </VStack>
                <Spacer/>
            </HStack>
        </VStack>
        
    )
}

export default Contracts