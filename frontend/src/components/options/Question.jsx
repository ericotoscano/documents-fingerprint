import { Box, Center, Heading } from '@chakra-ui/react';

function Question() {
  return (
    <Box>
      <Center>
        <Heading fontSize={30} mb={20}>
          What would you like to do?
        </Heading>
      </Center>
    </Box>
  );
}

export default Question;
