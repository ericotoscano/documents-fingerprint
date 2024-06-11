import { Box, Button, Center, Flex, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { ErrorDecoder } from 'ethers-decode-error';

function RegisterButton({
  signer,
  contractAddress,
  contractABI,
  title,
  songSignature,
  isRegisterLoading,
  setIsRegistered,
  setRegisterReceipt,
  setIsListed,
  setRegisterHash,
  setIsRegisterLoading,
  setErrorReason,
}) {
  const songRegister = new ethers.Contract(contractAddress, contractABI, signer);

  songRegister.on('Registered', (songwriter, songTitle, songSignature, event) => {
    const data = [songwriter, songTitle, songSignature];

    setRegisterReceipt(data);
    setRegisterHash(event.transactionHash);
    setIsListed(false);
    setIsRegisterLoading(false);
    setIsRegistered(true);
  });

  const errorDecoder = ErrorDecoder.create([contractABI]);

  const register = async () => {
    try {
      setIsRegisterLoading(true);
      const isPaused = await songRegister.isPaused();

      if (!isPaused) {
        const currentCost = await songRegister.cost();

        const tx = await songRegister.connect(signer).register(title, songSignature, { value: parseInt(currentCost), gasLimit: 200000 });

        await tx.wait();
      }
    } catch (error) {
      const customReasonMapper = ({ name }) => {
        switch (name) {
          case 'Paused':
            return 'Contract is Paused!';
          default:
            return 'An error has occurred';
        }
      };
      const decodedError = await errorDecoder.decode(error);
      const reason = customReasonMapper(decodedError);

      console.log('Custom error reason:', reason);

      songRegister.off('Registered');
      setIsRegisterLoading(false);
      setErrorReason(reason);
    }
  };

  return (
    <Box w={820} mb={40}>
      <Flex alignItems={'start'} justifyContent="center" flexDirection={'column'}>
        <Text mb={20} fontSize={20}>
          Now, it's time to register your song!
        </Text>
        <Box w={820} mt={20}>
          <Center>
            <Button isLoading={isRegisterLoading} loadingText="Registering..." fontSize={20} onClick={register}>
              Register Your Song
            </Button>
          </Center>
        </Box>
      </Flex>
    </Box>
  );
}

export default RegisterButton;
