import db from '../data/db.json'
import Layout from '../components/Layout'
import { TransactionsViewer } from '../components/DataViewers'


export async function getStaticProps() {
  return {
    props: {
      db,
    },
  }
}


export default function Page({ db }) {
  return (
    <Layout>
      <TransactionsViewer transactions={db}/>
    </Layout> 
  );
};