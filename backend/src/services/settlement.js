// src/services/settlement.js
export function computeSettlements(players) {
  // 1) Net balances
  const net = players.map(p => ({
    name:    p.name,
    balance: p.cashOut - p.buyIn,
  }));

  // 2) Build and sort debtors/creditors
  const debtors = net
    .filter(p => p.balance < 0)
    .map(p => ({ name: p.name, amount: -p.balance }))
    .sort((a, b) => b.amount - a.amount);      // largest debtor first

  const creditors = net
    .filter(p => p.balance > 0)
    .map(p => ({ name: p.name, amount: p.balance }))
    .sort((a, b) => b.amount - a.amount);      // largest creditor first

  // 3) Greedy settle
  const payments = [];
  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const debtor   = debtors[i];
    const creditor = creditors[j];
    const amt      = Math.min(debtor.amount, creditor.amount);

    payments.push({
      from:   debtor.name,
      to:     creditor.name,
      amount: amt
    });

    debtor.amount   -= amt;
    creditor.amount -= amt;

    if (debtor.amount === 0)   i++;
    if (creditor.amount === 0) j++;
  }

  return payments;
}
