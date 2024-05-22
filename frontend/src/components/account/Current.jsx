import { Box, Center, Text } from '@chakra-ui/react';

function Current({ accountFormatted }) {
  return (
    <Box mb={20}>
      <Center>
        <Text as="mark" px="0.5em" py="0.5em" borderRadius="0.25em" textColor="#f2f2f2" bgColor="#29a19c" fontSize={20}>
          Current Account Connected: {accountFormatted}
        </Text>
      </Center>
    </Box>
  );
}

export default Current;
