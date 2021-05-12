import { Graph2D } from '../components/Graph'
import db from '../data/db.json'
import graphBuilder from "../lib/graphBuilder";

export async function getStaticProps() {
  const graph = graphBuilder(db)
  return {
    props: {
      graph,
    },
  }
}

import Layout from '../components/Layout'
export default function Graph({ graph }) {
  return (
    <Layout>
      <Graph2D graph={graph}/>
    </Layout> 
  );
};