import {
    Flex,
    Button,
    useTheme
}from '@aws-amplify/ui-react';

import { Wrapper } from './Header.styles';

const Header = ({ signOut, user }) => {

    const { tokens } = useTheme();
  
    return (
      <Flex
          backgroundColor={tokens.colors.purple[60]}
          direction="row"
          justifyContent="space-between"
      >
          <h3>Hello {user.attributes.email}!</h3>
          <Button 
            colorTheme="overlay"
            onClick={signOut}>Sign out</Button>
      </Flex>
    );
};

export default Header;