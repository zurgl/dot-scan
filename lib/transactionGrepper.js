if (!Array.prototype.nth){
  Array.prototype.nth = function (n) {
      return this && this.length > n ? this[n] : undefined 
    };
};

const isNotBalanceModule = transaction => !transaction.events.nth(0)
  .module.includes("balances")

const onlyTransfert = sub => sub.type.includes("transfer")
const onlyDeposit = sub => sub.type.includes("deposit") && sub.module === 'balances'
const toDate = date => new Date(date).getTime()

const grep_time = transaction => toDate(transaction.time)

const grep_hash = transaction => transaction.hash

const grep_fee = (transaction) => transaction.transaction_fee
  ?.nth(0)
  ?.numeric

const grep_validator = (transaction) => transaction.events.nth(0)
  ?.sub.filter(onlyDeposit)
  ?.nth(0)
  ?.recipient
  ?.nth(0)
  ?.account
  ?.id;

const grep_validator0 = (transaction) => transaction.events.nth(0)
  ?.sub.filter(onlyDeposit)
  ?.nth(0)
  ?.node
  ?.versions
  ?.nth(0)
  ?.id

const grep_sender = (transaction) => transaction.events.nth(0)
  ?.sub.filter(onlyTransfert)
  ?.nth(0)
  ?.sender
  ?.nth(0)
  ?.account
  ?.id

const grep_sender0 = (transaction) => transaction.events.nth(0)
  ?.sub.filter(onlyTransfert)
  ?.nth(0)
  ?.node
  ?.versions
  ?.nth(0)
  ?.id

const grep_recipient = (transaction) => transaction.events.nth(0)
  ?.sub.filter(onlyTransfert)
  ?.nth(0)
  ?.recipient
  ?.nth(0)
  ?.account
  ?.id;

const grep_recipient0 = (transaction) => transaction.events.nth(0)
  ?.sub.filter(onlyTransfert)
  ?.nth(0)
  ?.node
  ?.versions
  ?.nth(1)
  ?.id

const grep_amount = (transaction) => transaction.events.nth(0)
  ?.sub.filter(onlyTransfert)
  ?.nth(0)
  ?.sender
  ?.nth(0)
  ?.amounts
  ?.nth(0)
  ?.numeric
  
const grep_amount0 = (transaction) => transaction.events.nth(0)
  ?.sub.filter(onlyTransfert)
  ?.nth(0)
  ?.amount['0']
  ?.numeric

exports.toEntry = (transaction) => {
  if (isNotBalanceModule(transaction)) {
    console.log(
      '!= balance module:',
      transaction.events[0].module
    )
    return []
  }

  try {
    const hash = grep_hash(transaction)
    if (hash === undefined)
      throw 'parsing of hash failed'

    const time = grep_time(transaction)
    if (time === undefined)
      throw 'parsing of time failed'

    const fee = grep_fee(transaction)
    if (fee === undefined)
      throw 'parsing of fee failed'
    
    const sender = grep_sender(transaction)
      ?? grep_sender0(transaction)
    if (sender === undefined)
      throw 'parsing of sender failed'

    const recipient = grep_recipient(transaction)
      ?? grep_recipient0(transaction)
    if (recipient === undefined)
      throw 'parsing of recipient failed'

    const amount = grep_amount(transaction)
      ?? grep_amount0(transaction)
    if (amount === undefined)
      throw 'parsing of amount failed'

    const validator = grep_validator(transaction)
      ?? grep_validator0(transaction)
    if (validator === undefined)
      throw 'parsing of validator failed'
    
    const transfer = {
      time,
      sender,
      recipient,
      amount,
      fee,
      validator,
    }

    return [ [hash, transfer] ]
  } catch (e) {
    console.error("Failed for:", transaction, "error:", e)
    return []
  }
}