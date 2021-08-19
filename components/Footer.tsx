import { Box, Container, HStack, Image, Link, LinkBox, LinkOverlay, List, ListItem, Text, VStack } from '@chakra-ui/react'
import * as React from 'react'
import { VERSION } from '../utils.client'

export function Footer(props: {
  maxWidth?: string
}) {
  return (
    <>
      <Box borderTopWidth={1} borderTopColor="gray.100" py={12} mt={24}>
        <Container maxWidth={props.maxWidth || '6xl'}>
          <HStack alignItems="stretch" spacing={24}>
            <Box fontSize="sm">
              <List color="gray.500" spacing={2}>
                <ListItem>
                  <Text color="gray.900" fontWeight="medium">Contact</Text>
                </ListItem>
                <ListItem>
                  <Link isExternal href="#">Twitter</Link>
                </ListItem>
                <ListItem>
                  <Link isExternal href="#">Blog</Link>
                </ListItem>
                <ListItem>
                  <Link isExternal href="#">GitHub</Link>
                </ListItem>
                <ListItem>
                  <Text>hi@cusdis.com</Text>
                </ListItem>

              </List>
            </Box>

            <Box fontSize="sm">
              <List color="gray.500" spacing={2}>
                <ListItem>
                  <Text fontWeight="medium" color="gray.900" >Resources</Text>
                </ListItem>
                <ListItem>
                  <Link isExternal href="#">Documentation</Link>
                </ListItem>
                <ListItem>
                  <Link isExternal href="#">Sponsor</Link>
                </ListItem>
                <ListItem>
                  <Link isExternal href="/privacy-policy">Privacy Policy</Link>
                </ListItem>
              </List>
            </Box>
          </HStack>
        </Container>
      </Box>

    </>
  )
}
