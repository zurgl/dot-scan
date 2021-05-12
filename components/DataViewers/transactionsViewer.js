import {
  DataTable,
  Text
} from 'grommet'


const TransactionsViewer = ({ transferts }) => {
  const data = transferts.map(tr => {
    return {
      hash: tr[0],
      ...tr[1] 
    }
  })

  return (
    <DataTable
      columns={[
        {
          property: 'hash',
          header: <Text>Hash</Text>,
          primary: true,
          render: d => <Text>{d.hash.slice(0,10)+"..."}</Text>
        },
        {
          property: 'time',
          header: <Text>Time</Text>,
        },
        {
          property: 'sender',
          header: <Text>From</Text>,
          render: d => <Text>{d.sender.slice(0,10)+"..."}</Text>
        },
        {
          property: 'recipient',
          header: <Text>To</Text>,
          render: d => <Text>{d.recipient.slice(0,10)+"..."}</Text>
        },
        {
          property: 'amount',
          header: <Text>Amount</Text>,
          render: d => <Text>{d.amount / 10 ** 10} {"DOT" }</Text>
        },
        {
          property: 'fee',
          header: <Text>Fee</Text>,
          render: d => <Text>{d.fee / 10**10 }</Text>
        },
      ]}
      data={data}
      sortable
      step={15}
      paginate
    />
  )
}


export default TransactionsViewer