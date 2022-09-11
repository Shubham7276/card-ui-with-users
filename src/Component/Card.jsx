import {
    Heading,
    useToast,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    Input,
    Badge,   
  } from '@chakra-ui/react';
import { Fragment, useState } from 'react';

  
  export default function GitProfileWithImage() {

    const [textinput, setTextInput] = useState("")
    const [user, setUser] = useState("")
    const [show, setShow] = useState(false)

    const toast = useToast()
    

    // Get the profile using Username (login)

    const GitHubuser = async() =>{
        if(textinput === ""){
            
            toast({
                title: 'Fill the data',
                description: "Please enter username",
                position:'top-right',
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
        }else{
            try {
                let username = textinput
                const responce = await fetch(`https://api.github.com/users/${username}`)
                console.log(responce.status)
                if(responce.status >= 400 && responce.status <= 500){
                    setShow(false)
                    toast({
                        title: 'User not found',
                        description: "Search another username",
                        position:'top-right',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                      })
                }else{
                    const data = await responce.json();
                    setShow(true)
                    setUser(data)
                    setTextInput("")
                }
                
            } catch (error) {
                    console.log(error)
            }
        }
        
    }

    // show toast msg like

    const likeToast = () =>{
        toast({
            title: 'Like',
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
    }




    return (
        <Fragment>
      
         <Heading fontSize={'2xl'}>Show a card ui with users github public information</Heading>
         <Input placeholder='Username' value={textinput} onChange={(e)=>setTextInput(e.target.value)} marginTop={"18px"} width='200px' />
         <Button colorScheme='blue' marginLeft={"15px"} onClick={()=>GitHubuser()}>Submit</Button>
         <Center py={6}>
      {show?(<Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: '100%', md: '540px' }}
        height={{ sm: '476px', md: '20rem' }}
        direction={{ base: 'column', md: 'row' }}
        boxShadow={'2xl'}
        padding={4}>
        <Flex flex={1} bg="blue.200">
          <Image
            objectFit="cover"
            boxSize="100%"
            src={
              user.avatar_url
            }
          />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={1}
          pt={2}>
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            {user.name}
          </Heading>
          <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
            @{user.login}
          </Text>
    
          <Stack align={'center'} justify={'center'} direction={'row'} mt={4}>
         
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            {user.public_repos}
          </Heading>
          <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
          public Repos 
          </Text>
          </Stack>

          <Stack align={'center'} justify={'center'} direction={'row'} mt={4}>
         
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            {user.public_gists}
          </Heading>
          <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
          public Gits 
          </Text>
          </Stack>
          
          
          <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
            <Badge
              px={2}
              py={1}
              fontWeight={'400'}>
              Created Date - {user.created_at?.slice(0, 10)}
            </Badge>
            
          </Stack>

          <Stack
            width={'100%'}
            mt={'2rem'}
            direction={'row'}
            padding={2}
            justifyContent={'space-between'}
            alignItems={'center'}>
            
            <Button
              onClick={likeToast}
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              bg={'red.400'}
              color={'white'}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              _hover={{
                bg: 'red.500',
              }}
              _focus={{
                bg: 'red.500',
              }}>
              Like this profile
            </Button>
           
          </Stack>
        </Stack>
      </Stack>): (
        null
      ) }
    </Center>
   
      </Fragment>
    );
  }