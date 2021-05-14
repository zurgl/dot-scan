const { toEntry } = require('../lib/transactionGrepper')
const { writeFileSync } = require('fs')
const { fetchAllData } = require('../lib/apiFetcher')
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
  
  const rewardTransaction = (await fetchAllData(addr0, asSender = true))
    .flatMap(toEntry)
    .filter(onlyReward)
  
  const db = new Map(rewardTransaction)

  for (let transfer of rewardTransaction) {
    (await fetchAllData(transfer[1].recipient))
      .flatMap(toEntry)
      .forEach(entry => db.set(...entry))
  }

  saveDB(Array.from(db.entries()))
}

makeDB()
  .catch((err) => {
    console.error(err);
  })
  .finally(() => process.exit());