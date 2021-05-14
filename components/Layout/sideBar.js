import { Database, Cluster, Cubes } from 'grommet-icons'
import { Box, Button } from 'grommet'
import Link from 'next/link'

const entriesProps = [
  { key: 'index', path: '/', icon: <Database size='large' /> },
  { key: 'graph2D', path: '/graph2D', icon: <Cluster size='large' />},
  { key: 'graph3D', path: '/graph3D', icon: <Cubes size='large' />},
]

function Entry({ path, icon }) {
  return (
    <Button pag="medium" href="#" hoverIndicator>
      <Link href={path}>
        <Box
          pad={{ horizontal: 'medium', vertical: 'small' }}
          align="center"
        >
        {icon}
        </Box>
      </Link>
    </Button>
  )
}

function SideBar() {
  return (
    <Box
      gridArea="sidebar"
      background="brand"
      width="xsmall"
      gap="large"
    >
      {entriesProps.map(({key, path, icon}) =>
        <Entry
          key={key}
          path={path}
          icon={icon}
        />)}
    </Box>
    ) 
}

export default SideBar