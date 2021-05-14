const addr0 = '12VpUFS23SePmovN9PXjXn6yRprUCXUG5YVbfYJoTY9MsDNw'
const groups = new Map().set(addr0, 0)

const assignGroup = (addr) => groups.get(addr)

const makeGroups = (graph) => {
  for (let tr of graph.values()) {
    if (tr.sender === addr0) {
      groups.set(tr.recipient, 1)
    } else {
      if (tr.recipient != addr0) {
        groups.set(tr.recipient, 2)
      }
    }
  }
  for (let tr of graph.values()) {
    if (!groups.has(tr.recipient)) {
      groups.set(tr.recipient, 3)
    }
    if (!groups.has(tr.sender)) {
      groups.set(tr.sender, 4)
    }
  }
}

const graphBuilder = (db0) => {
  const db = new Map(db0)

  makeGroups(db)

  const links = Array.from(db.values()).map(tr => {
    return {
      source: tr.sender,
      target: tr.recipient,
      value: tr.amount / 10**10,
    }
  })

  const nodeSet = new Set([
    ...Array.from(db.values()).map(tr => tr.recipient),
    ...Array.from(db.values()).map(tr => tr.sender)
  ])

  const nodes = Array.from(nodeSet.values()).map(addr => {
    return {
      id: addr,
      name: addr.slice(0, 5),
      group: assignGroup(addr),
    }
  })

  return { nodes, links }
}

export default graphBuilder