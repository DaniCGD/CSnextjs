import Head from 'next/head'
import type { NextPage } from 'next'
import { VStack, HStack, Heading, Text, Button, Input, Box, Spacer, Spinner } from '@chakra-ui/react'
import React from 'react'
import {load} from '../src/funcs'

//Components
import { NavBar } from '../src/components/NavBar'

const Home: NextPage = () =>{

  const [contratante, setContratante] = React.useState<string>('');
  const [contratado, setContratado] = React.useState<string>('');
  const [garante, setGarante] = React.useState<string>('');
  const [garante1, setGarante1] = React.useState<string>('');
  const [garante2, setGarante2] = React.useState<string>('');
  const [date, setDate] = React.useState<string>('');
  const [monto, setMonto] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [refresh, setRefresh] = React.useState<boolean>(true);
  const [addressAccount, setAddresAccount] = React.useState<any>(null);
  const [contracts, setContracts] = React.useState<any[]>([]);
  const [contract, setContract] = React.useState<any>(null);

  //Handlers

  const handleContratanteChange = (e:any) => setContratante(e.currentTarget.value);
  const handleContratadoChange = (e:any) => setContratado(e.currentTarget.value);
  const handleGaranteChange = (e:any) => setGarante(e.currentTarget.value);
  const handleGarante1Change = (e:any) => setGarante1(e.currentTarget.value);
  const handleGarante2Change = (e:any) => setGarante2(e.currentTarget.value);
  const handleDateChange = (e:any) => setDate(e.currentTarget.value);
  const handleMontoChange = (e:any) => setMonto(e.currentTarget.value);
  const handleDescriptionChange = (e:any) => setDescription(e.currentTarget.value);

  const handleAddContract = async () =>{
    await contract.createContract(contratante,contratado,garante,garante1,garante2,description,date,monto,{from: addressAccount});
    setContratante('');
    setContratado('');
    setGarante('');
    setGarante1('');
    setGarante2('');
    setMonto('');
    setDate('');
    setDescription('');
    setRefresh(true);
  };
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

  const tab = <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>;

  return (
    <VStack>
      <Head>
        <title>CSolution</title>
        <meta name='description' content='Csolution'/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HStack w='full'>
        <Spacer/>
          <VStack>
            < NavBar />
            <Text>{tab}</Text>
            <Box h='30px'/> 
            <Text>Wallets</Text>
            <HStack>
              <Input
                type='text'
                size='md'
                placeholder='Contratante'
                onChange={handleContratanteChange}
                value={contratante}
              /> 
               <Input
                type='text'
                size='md'
                placeholder='Contratado'
                onChange={handleContratadoChange}
                value={contratado}
              />               
            </HStack>
            <Text>Garante(s) {tab} Datos del Contrato</Text>
            <HStack>
              <Input
                type='text'
                size='md'
                placeholder='Garante'
                onChange={handleGaranteChange}
                value={garante}
              />
                            <Input
                type='text'
                size='md'
                placeholder='Fecha || yyyy-'
                onChange={handleDateChange}
                value={date}
              /> 
            </HStack>
            <HStack>  
              <Input
                type='text'
                size='md'
                placeholder='Garante'
                onChange={handleGarante1Change}
                value={garante1}
              />
              <Input
                type='text'
                size='md'
                placeholder='Monto'
                onChange={handleMontoChange}
                value={monto}
              />              
            </HStack>
            <HStack>
              <Input
                type='text'
                size='md'
                placeholder='Garante'
                onChange={handleGarante2Change}
                value={garante2}
              /> 
              <Input
                type='text'
                size='md'
                placeholder='Descripcion'
                onChange={handleDescriptionChange}
                value={description}
              />              
            </HStack>
            <Box h='15px'/>
              <Button onClick={handleAddContract} bg='green.300'>Crear</Button>
            <Box h='30px'/>
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

export default Home