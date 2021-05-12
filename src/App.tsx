import * as React from "react";
import { ChakraProvider, Container, theme } from "@chakra-ui/react";
import NavBar from "./components/NavBar";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Container position='sticky' top='1' maxWidth='100%'>
      <NavBar />
    </Container>
  </ChakraProvider>
);
