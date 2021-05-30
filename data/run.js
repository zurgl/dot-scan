const { toEntry } = require('../lib/transactionGrepper')
const { writeFileSync } = require('fs')
const { fetchData } = require('../lib/apiFetcher')
const { join } = require('path')

const saveJSONContent = (data, path, file) => {
  const filePath = join(process.cwd(), path, file);
  const content = JSON.stringify(data);
  writeFileSync(filePath, content);
}

const saveDB = (data) => saveJSONContent(data, 'data', 'db.json')

const makeDB = async () => {
  const addr0 = '12VpUFS23SePmovN9PXjXn6yRprUCXUG5YVbfYJoTY9MsDNw'
  const onlyReward = (entry) => entry[1].amount === 11000000000
  
  const transactions = (await fetchData(addr0, true))
   .flatMap(toEntry)
   .filter(onlyReward)
  
  const db = new Map(transactions)

  const MAX_CONCURRENT = 5;
  for (let n = 0; n < transactions.length; n += MAX_CONCURRENT)
    (
      await Promise.allSettled(
        transactions
          .slice(n, n + MAX_CONCURRENT)
          .map(tr => fetchData(tr[1].recipient))
      )
    )
      .flatMap(response => response.value)
      .flatMap(toEntry)
      .forEach(entry => db.set(...entry))
  
  saveDB(Array.from(db.entries()))
}

makeDB()
  .catch((err) => {
    console.error(err);
  })
  .finally(() => process.exit());