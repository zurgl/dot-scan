const { toEntry } = require('../lib/transactionGrepper')
const { readFileSync, writeFileSync } = require('fs')
const { fetchAllData } = require('../lib/apiFetcher')
const { join } = require('path')

const DBPath = 'data'

const loadJSONContent = (fileName) => {
  const filePath = join(process.cwd(), DBPath, fileName);
  const buffer = readFileSync(filePath);
  return JSON.parse(buffer.toString());  
}

const saveJSONContent = async (data, fileName) => {
  const filePath = join(process.cwd(), DBPath, fileName);
  const content = JSON.stringify(data);
  writeFileSync(filePath, content);
}

const saveDB = async (data) => saveJSONContent(data, 'db.json')
//const loadDB = async () => loadJSONContent('db.json')

const makeDB = async () => {
  const addr0 = '12VpUFS23SePmovN9PXjXn6yRprUCXUG5YVbfYJoTY9MsDNw'
  const reward = 11000000000
  const onlyReward = (entry) => entry[1].amount === reward
  
  const rewardTransaction = (await fetchAllData(addr0, asSender = true))
    .map(toEntry)
    .filter(onlyReward)
  
  const db = new Map(rewardTransaction)

  for (let transfer of rewardTransaction) {
    (await fetchAllData(transfer[1].recipient))
      .map(toEntry)
      .forEach(entry => db.set(...entry))
  }
  saveDB(Array.from(db.entries()))
}


makeDB()
  .catch((err) => {
    console.error(err);
  })
  .finally(() => process.exit());



