// src/services/settlement.js

/**
 * Given an array of { name, buyIn, cashOut },
 * returns [{ from, to, amount }, …] so that everyone ends
 * with net zero.
 */
export function computeSettlements(players) {
  // 1) Compute net for each player
  const net = players.map(p => ({
    name: p.name,
    balance: p.cashOut - p.buyIn,
  }));

  // 2) Separate debtors (<0) and creditors (>0)
  const debtors   = net.filter(p => p.balance < 0)
                       .map(p => ({ ...p, amount: -p.balance }));
  const creditors = net.filter(p => p.balance > 0)
                       .map(p => ({ ...p, amount: p.balance }));

  const payments = [];
  let i = 0, j = 0;
  // 3) Greedy match debtors → creditors
  while (i < debtors.length && j < creditors.length) {
    const d = debtors[i], c = creditors[j];
    const amt = Math.min(d.amount, c.amount);
    payments.push({ from: d.name, to: c.name, amount: amt });
    d.amount -= amt;
    c.amount -= amt;
    if (d.amount === 0) i++;
    if (c.amount === 0) j++;
  }
  return payments;
}
