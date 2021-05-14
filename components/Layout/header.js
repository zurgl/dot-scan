import { AppsRounded, Github } from 'grommet-icons'
import { Box } from 'grommet'

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
      <AppsRounded size='large' />
      <a href='https://github.com/zurgl/dot-scan'>
        <Github size='large' />
      </a>
    </Box>
  ) 
}

export default Header