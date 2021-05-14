import { Graph3D } from '../components/Graphs'
import graphBuilder from '../lib/graphBuilder'
import Layout from '../components/Layout'
import db from '../data/db.json'

export async function getStaticProps() {
  const graph = graphBuilder(db)
  return {
    props: {
      graph,
    },
  }
}

export default function Graph({ graph }) {
  return (
    <Layout>
      <Graph3D graph={graph}/>
    </Layout> 
  );
};