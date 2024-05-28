import { Box, Button, Center, Flex, Highlight, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';

function GetSongsButton({ account, signer, contractAddress, contractABI, songList, isSongListLoading, isListed, isRegistered, setSongList, setIsListed, setIsSongListLoading }) {
  const getSongs = async () => {
    try {
      setIsSongListLoading(true);

      const SongRegister = new ethers.Contract(contractAddress, contractABI, signer);
      const songs = await SongRegister.connect(signer).getSongs(account);

      setSongList(songs);
      setIsListed(true);
      setIsSongListLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Box w={820}>
      <Center>
        {isListed ? (
          songList.length == 0 ? (
            <Box w={820} mb={40}>
              <Flex alignItems={'start'} justifyContent="center" flexDirection={'column'}>
                <Text as="b" mt={20} mb={40} fontSize={20} color={'tomato'}>
                  You have no songs registered yet!
                </Text>
                <Box w={820}>
                  <Center>
                    <Text as="b" mt={20} mb={20} fontSize={20}>
                      <Highlight
                        query="Register a Song"
                        styles={{ px: '0.75em', py: '0.75em', border: '4px solid transparent', borderRadius: '3em', borderColor: '#f2f2f2', bg: '#60316e', color: 'white' }}
                      >
                        Go to Register a Song
                      </Highlight>
                    </Text>
                  </Center>
                </Box>
              </Flex>
            </Box>
          ) : (
            <Box w={820} mt={20} mb={40}>
              <Flex alignItems={'start'} justifyContent="center" flexDirection={'column'}>
                {songList.map((line, index) => (
                  <li key={index}>
                    <Box mb={15} w={820}>
                      <Text as="em" fontSize="x-large" align={'center'} color="#f1c550">
                        Song {index + 1} Signature {line}
                      </Text>
                    </Box>
                  </li>
                ))}
              </Flex>
            </Box>
          )
        ) : (
          <Box w={820}>
            <Text fontSize={20} mb={20}>
              Click on the button bellow to get a list of all your songs signatures.
            </Text>
            <Box>
              <Center>
                <Button isLoading={isSongListLoading} loadingText="Getting Your Songs..." fontSize={20} mt={20} mb={40} onClick={getSongs}>
                  Get Songs
                </Button>
              </Center>
            </Box>
          </Box>
        )}
      </Center>
    </Box>
  );
}

export default GetSongsButton;
