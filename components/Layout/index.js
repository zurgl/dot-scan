import {
  Grommet,
  Box,
  Grid
} from 'grommet';
import { grommet } from 'grommet/themes';
import Header from './header'
import SideBar from './sideBar'
import Main from './main'


const Layout = ({ children }) => {
  return (
    <Grommet full theme={grommet}>
      <Box fill >
      <Grid
        fill
        pad="xsmall"
        gap="xsmall"
        rows={['xsmall', 'flex']}
        columns={['auto', 'flex']}
        areas={[
          { name: 'header', start: [0, 0], end: [1, 0] },
          { name: 'sidebar', start: [0, 1], end: [0, 1] },
          { name: 'main', start: [1, 1], end: [1, 1] },
        ]}
        >
        <Header />
        <SideBar />
        <Main children={children} />
      </Grid>
      </Box>
    </Grommet>
  );
};

export default Layout
