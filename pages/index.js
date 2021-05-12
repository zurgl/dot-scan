import transfertsMap from '../data/db.json'
import Layout from '../components/Layout'
import TransactionsViewer from '../components/DataViewers/transactionsViewer'


export async function getStaticProps() {
  const transferts = transfertsMap
  return {
    props: {
      transferts,
    },
  }
}


export default function Page({ transferts }) {
  return (
    <Layout>
      <TransactionsViewer transferts={transferts}/>
    </Layout> 
  );
};