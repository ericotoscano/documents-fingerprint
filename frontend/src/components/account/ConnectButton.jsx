import { Box, Button, Center } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { formatAccount } from '../../utils/formatter';

function ConnectButton({ account, setAccount, setAccountFormatted, setSigner }) {
  const getAccount = async () => {
    try {
      let signer = null;
      let provider;

      if (window.ethereum == null) {
        console.log('MetaMask not installed; using read-only defaults');
        provider = ethers.getDefaultProvider();
      } else {
        provider = new ethers.BrowserProvider(window.ethereum);

        const accounts = await provider.send('eth_requestAccounts', []);

        if (account !== accounts[0]) {
          const partialAccount = formatAccount(accounts[0]);

          setAccount(accounts[0]);
          setAccountFormatted(partialAccount);
          setSigner(await provider.getSigner(accounts[0]));
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box mb={40} mt={20}>
      <Center>
        <Button onClick={getAccount} bgColor="#22267b" color="#f2f2f2">
          Connect Your Account
        </Button>
      </Center>
    </Box>
  );
}

export default ConnectButton;
