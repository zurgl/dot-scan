exports.fetchAllData = async (addr, asSender = false) => {
  const page = { data: [], n: 0 }
  while (await fetchData(addr, page, asSender)) { }
  return page.data;
}

const fetchData = async (addr, page, asSender = false, retry = 0) => {
  require("dotenv").config();
  const api = require("axios").create({
    baseURL: `https://polkadot--search.datahub.figment.io/apikey/${process.env.API_KEY}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  const pageSize = 100;
  const endDate = new Date().toISOString();
  const startDate = '2021-01-01T00:00:00Z';
  const ENDPOINT = "/transactions_search"

  const queryParams = {
    network: "polkadot",
    chain_ids: ["mainnet"],
    type: ['transfer'],
    limit: pageSize,
    before_time: endDate,
    after_time: startDate,
  }

  const rpcCall = async (params) => api.post(ENDPOINT, params, {timeout:2000})

  if (retry == 5) return false
  if (asSender) {
    queryParams.sender = [addr]
  } else {
    queryParams.account = [addr]
  }
  queryParams.offset = pageSize * page.n
  console.log("Addr:",addr,"page:", page.n,"retry:",retry)
  let response;
  try {
    response = await rpcCall(queryParams)
    page.n += 1;
    page.data.push(...response.data);
  } catch (e) {
    await feedData(addr, page, asSender, ++retry)
  } finally {
    return response.data?.length === pageSize ? true : false;
  }
}