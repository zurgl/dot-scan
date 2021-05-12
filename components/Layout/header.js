import { Box } from 'grommet'
import { AppsRounded, Github } from 'grommet-icons';

const Header = () => {
  return (
    <Box
      gridArea="header"
      direction="row"
      align="center"
      justify="between"
      pad={{ horizontal: 'medium', vertical: 'small' }}
      background="black"
    >
      <AppsRounded
        size='large'
      />
      <a href='https://github.com'>
        <Github size='large' />
      </a>
    </Box>
  ) 
}

export default Header