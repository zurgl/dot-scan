import { Box, Button } from 'grommet'
import {
  Database,
  Cluster,
  Cubes,
} from 'grommet-icons'
import Link from 'next/link'

function SideBar() {
  return (
    <Box
      gridArea="sidebar"
      background="brand"
      width="xsmall"
      gap="large"
      animation={[
        { type: 'fadeIn', duration: 300 },
        { type: 'slideRight', size: 'xlarge', duration: 150 },
      ]}
    >
      <Button key={"database"} pag="medium" href="#" hoverIndicator>
          <Link href={"/"}>
          <Box
            pad={{ horizontal: 'medium', vertical: 'small' }}
            align="center"
          >
            <Database size="large" />
          </Box>
      </Link>
      </Button>
      <Button key={"graph2D"} href="#" hoverIndicator>
          <Link href={"graph2D"}>
          <Box
            pad={{ horizontal: 'medium', vertical: 'small' }}
            align="center"
          >
            <Cluster size="large"/>
          </Box>
      </Link>
      </Button>
      <Button key={"graph3D"} href="#" hoverIndicator>
          <Link href={"graph3D"}>
          <Box
            pad={{ horizontal: 'medium', vertical: 'small' }}
            align="center"
          >
            <Cubes size="large" />
          </Box>
      </Link>
      </Button>
    </Box>
  ) 
}

export default SideBar