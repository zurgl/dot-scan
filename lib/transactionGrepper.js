if (!Array.prototype.safeHead){
  Array.prototype.safeHead = function () {
      return this.length != 0 ? this[0] : undefined 
    };
};

const onlyDeposit = (ev => ev.type.includes("deposit"))

const onlyTransfert = (ev => ev.type.includes("transfer"))

const toDate = (date) => new Date(date).getTime()

const time = (transaction) => toDate(transaction?.time)

const hash =  (transaction) => transaction?.hash

const validator = (transaction) =>  transaction
  ?.events.safeHead()
  ?.sub.filter(onlyDeposit).safeHead()
  ?.recipient.safeHead()
  ?.account
  ?.id;
  
const sender = (transaction) =>  transaction
  ?.events.safeHead()
  ?.sub.filter(onlyTransfert).safeHead()
  ?.sender.safeHead()
  ?.account
  ?.id;

const recipient = (transaction) =>  transaction
  ?.events.safeHead()
  ?.sub.filter(onlyTransfert).safeHead()
  ?.recipient.safeHead()
  ?.account
  ?.id;

const amount = (transaction) =>  transaction
  ?.events.safeHead()
  ?.sub.filter(onlyTransfert).safeHead()
  ?.sender.safeHead()
  ?.amounts.safeHead()
  ?.numeric

const type = (transaction) =>  transaction
  ?.events.safeHead()
  ?.type.safeHead();

const decimal = (transaction) =>  transaction
  ?.transaction_fee.safeHead()
  ?.exp;

const ticker = (transaction) =>  transaction
  ?.transaction_fee.safeHead()
  ?.currency;

const fee = (transaction) =>  transaction
  ?.transaction_fee.safeHead()
  ?.numeric;


exports.toEntry = (transaction) => {
  const transfer = {
    time: time(transaction),
    sender: sender(transaction),
    recipient: recipient(transaction),
    amount: amount(transaction),
    fee: fee(transaction)
  };

  return [ hash(transaction), transfer]
}
