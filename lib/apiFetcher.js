require("dotenv").config()

const api = require("axios").create({
  baseURL: `https://polkadot--search.datahub.figment.io/apikey/${process.env.API_KEY}`,
  headers: {
    "Content-Type": "application/json",
  },
});

const rpcCall = async (params) => api.post('/transactions_search', params, {timeout:2000})

const MAX_RETRY = 5
const PAGE_SIZE = 100
const END_DATE = new Date().toISOString()
const START_DATE = new Date('2020-04-01').toISOString()

const queryParams = {
  network: "polkadot",
  chain_ids: ["mainnet"],
  type: ['transfer'],
  limit: PAGE_SIZE,
  before_time: END_DATE,
  after_time: START_DATE,
}

const fetchData = async (addr, asSender = false) => {
  const rpcParams = {...queryParams}  
  if (asSender) {
    rpcParams.sender = [addr]
  } else {
    rpcParams.account = [addr]
  }
  
  const fetcher = async (data, page = 0, retry = 0) => {
    console.log("Addr:", addr, "page:", page, "retry:", retry, "asSender:", asSender)    
    if (retry == MAX_RETRY) {
      return data
    }

    try {
      rpcParams.offset = PAGE_SIZE * page
      data.push(...(await rpcCall(rpcParams)).data)
      if (data.length % PAGE_SIZE === 0) {
        await fetcher(data, ++page, retry)
      } else {
        return data
      }
    } catch (e) {
      console.error(e)
      await fetcher(data, page, ++retry)
    }
  }

  const data = []
  await fetcher(data)
  return data
}

module.exports = {
  fetchData
}