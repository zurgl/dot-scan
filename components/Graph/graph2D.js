import dynamic from 'next/dynamic'

const ForceGraph2D = dynamic(
  () => import('react-force-graph-2d'),
  { ssr: false }
)


const Graph2D = ({ graph, height, width }) => {
  return (
    <ForceGraph2D
      graphData={graph}
      width={width}
      height={height}
      nodeLabel="id"
      nodeAutoColorBy="group"
      linkDirectionalArrowLength={3.5}
      linkDirectionalArrowRelPos={1}
      linkDirectionalParticles="value"
      linkDirectionalParticleSpeed={d => d.value * 0.005}
      onNodeDragEnd={node => {
        node.fx = node.x;
        node.fy = node.y;
        node.fz = node.z;
      }}
    />
  )
}

export default Graph2D