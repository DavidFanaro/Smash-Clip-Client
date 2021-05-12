import {
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, {FormEvent, useCallback, useEffect } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { logginWithGoogle } from "../Api";
import { userAtom, isLoggedInAtom } from "../atoms";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { user } from "../Interfaces/user";
import ProfileBadge from "./ProfileBadge";

const NavBar = () => {
  const [user, setuser] = useRecoilState(userAtom);
  const [isloggedin, setisloggedin] = useRecoilState(isLoggedInAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [clipTitle, setclipTitle] = useState("");
  const [clipFile, setclipFile] = useState<File | null>(null)

  const logout = useCallback(() => {
    window.open("http://localhost:4000/api/auth/google/logout", "_self");
    setisloggedin(false);
  }, [setisloggedin]);

  const getUser = useCallback(() => {
    fetch("http://localhost:4000/api/user/", {
      credentials: "include",
    }).then(async (response) => {
      if (response.status === 200) {
        const data: user = await response.json();
        // console.log(data)
        setuser(data);
        setisloggedin(true);
        console.log(data);
      } else {
        setisloggedin(false);
        setuser(null);
        console.log("loggin pls");
      }
    });
  }, [setisloggedin, setuser]);

  useEffect(() => {
    getUser();
    return () => {};
  }, [getUser]);

  const sumbitClip = (e:FormEvent<HTMLFormElement>) =>{
      e.preventDefault();
      const file = clipFile!
      const data = new FormData()
      data.append("title", clipTitle)
      data.append;
      fetch("http://localhost:4000/api/clips/",{
        method:'POST',
        credentials:"include",
        

      })

  }


  return (
    <div>
      <Flex p="2">
        <HStack p="2">
          <Heading size="md">Smash Clips</Heading>

          {isloggedin ? <Button onClick={onOpen}>+</Button> : null}
        </HStack>
        <Spacer />
        <HStack spacing="2">
          {isloggedin ? (
            <>
              <ProfileBadge user={user!} />

              <Button colorScheme="teal" mr="4" onClick={() => logout()}>
                Log Out
              </Button>
            </>
          ) : (
            <Button
              colorScheme="teal"
              mr="4"
              onClick={() => logginWithGoogle()}
            >
              Login with Google
            </Button>
          )}

          <ColorModeSwitcher />
        </HStack>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={(e)=>sumbitClip(e)}>
            <ModalBody>
              <Center>
                <Text> Title</Text>
              </Center>
              <Input required={true} onChange={(e) => setclipTitle(e.target.value)} value={clipTitle}/>
              <Center>
                <Text> Clip</Text>
              </Center>
              <Input type='file' accept='video/*' required={true} onChange={(e) => setclipFile(e.target.files?.item(0)!)}/>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" type='submit'>Upload</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default NavBar;
