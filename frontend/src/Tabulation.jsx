import Write from './Write';
import Encrypt from './Encrypt';
import Deposit from './Deposit';

import { Box, Center, Flex, Link, Tab, Tabs, TabList, TabPanels, Text } from '@chakra-ui/react';

function Tabulation({
  account,
  isSubmitted,
  isEncrypted,
  signer,
  title,
  lyrics,
  lyricsByLine,
  songSignature,
  depositReceipt,
  setTitle,
  setIsSubmitted,
  setIsEncrypted,
  setLyrics,
  setLyricsByLine,
  setSongSignature,
  setDepositReceipt,
}) {
  return (
    <Box w="100vw">
      <Center>
        <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
          {account ? (
            <Tabs mt={20}>
              <Box>
                <Center>
                  <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
                    <TabList mb={20}>
                      <Tab marginInline={10}>Write</Tab>

                      {isSubmitted && title && lyrics ? (
                        <Tab marginInline={10}>Encrypt</Tab>
                      ) : (
                        <Tab isDisabled marginInline={10}>
                          Encrypt
                        </Tab>
                      )}

                      {isEncrypted && title && lyrics && songSignature ? (
                        <Tab marginInline={10}>Deposit</Tab>
                      ) : (
                        <Tab isDisabled marginInline={10}>
                          Deposit
                        </Tab>
                      )}

                      {title && lyrics && songSignature && depositReceipt ? (
                        <Tab marginInline={10}>Register</Tab>
                      ) : (
                        <Tab isDisabled marginInline={10}>
                          Register
                        </Tab>
                      )}
                    </TabList>
                  </Flex>
                </Center>
              </Box>
              <Box>
                <Center>
                  <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
                    <TabPanels>
                      <Write
                        isSubmitted={isSubmitted}
                        isEncrypted={isEncrypted}
                        lyrics={lyrics}
                        title={title}
                        lyricsByLine={lyricsByLine}
                        setIsSubmitted={setIsSubmitted}
                        setIsEncrypted={setIsEncrypted}
                        setTitle={setTitle}
                        setLyrics={setLyrics}
                        setLyricsByLine={setLyricsByLine}
                        setSongSignature={setSongSignature}
                      />
                      <Encrypt
                        isEncrypted={isEncrypted}
                        account={account}
                        title={title}
                        lyricsByLine={lyricsByLine}
                        songSignature={songSignature}
                        setIsEncrypted={setIsEncrypted}
                        setSongSignature={setSongSignature}
                      />
                      <Deposit account={account} signer={signer} depositReceipt={depositReceipt} setDepositReceipt={setDepositReceipt} />
                    </TabPanels>
                  </Flex>
                </Center>
              </Box>
            </Tabs>
          ) : (
            <Text fontSize={25}>
              Built with{' '}
              <Link href="https://chakra-ui.com" isExternal>
                Chakra UI/React
              </Link>
            </Text>
          )}
        </Flex>
      </Center>
    </Box>
  );
}

export default Tabulation;
