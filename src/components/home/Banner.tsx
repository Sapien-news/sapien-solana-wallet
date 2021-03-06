//Changed to Component Header and also Routed to Header on Index Page
//Hence This Component is no longer Required 
import React from "react";
import { Box, ButtonGroup, Heading, Text } from "@chakra-ui/react";
import ReadButton from "../buttons/ReadButton";
import KnowMoreButton from "../buttons/KnowMoreButton";

const Banner = () => {
  return (
    <Box className={"banner"} width={"100%"} height={"100%"} maxHeight={"23vh"}>
      <Box padding={10} width={"25%"} mt={100}>
        <Heading mb={5}>Sapiens</Heading>
        <Text>The 🌎 of Un-biased media</Text>
        <ButtonGroup mt={"10"}>
          <ReadButton />
          <KnowMoreButton />
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default Banner;
