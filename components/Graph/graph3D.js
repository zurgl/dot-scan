import dynamic from 'next/dynamic'

const ForceGraph3D = dynamic(
  () => import('react-force-graph-3d'),
  { ssr: false }
)


const Graph3D = ({ graph, height, width }) => {
  return (
    <ForceGraph3D
      graphData={graph}
      width={width}
      height={height}
      nodeLabel="id"
      nodeAutoColorBy="group"
    />
  )
}

export default Graph3D