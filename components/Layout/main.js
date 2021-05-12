import React, {
  useState,
  useRef,
  useEffect
} from 'react'
import { Box } from 'grommet';

const Main = ({ children }) => {
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    setHeight(ref?.current?.clientHeight)
    setWidth(ref?.current?.clientWidth)
  },[])

  return (
    <Box
      gridArea="main"
      justify="center"
      align="center"
      ref={ref}
    >
      {React.cloneElement(children, { height, width })}
    </Box>
  )
}

export default Main