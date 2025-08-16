// src/services/settlement.js
export function computeSettlements(players) {
  // 1) Net balances
  const net = players.map(p => ({
    name:    p.name,
    balance: p.cashOut - p.buyIn,
  }));

  // 2) Build and sort debtors/creditors
  let debtors = net
    .filter(p => p.balance < 0)
    .map(p => ({ name: p.name, amount: -p.balance }));

  let creditors = net
    .filter(p => p.balance > 0)
    .map(p => ({ name: p.name, amount: p.balance }));

  // 2a) Settle exact matches first
  const payments = [];
  let d = 0;
  while (d < debtors.length) { 
    const debtor = debtors[d];
    const matchIdx = creditors.findIndex(c => c.amount === debtor.amount);
    if (matchIdx !== -1) {
      payments.push({
        from: debtor.name,
        to: creditors[matchIdx].name,
        amount: debtor.amount,
      });
      // Remove matched creditor and debtor
      creditors.splice(matchIdx, 1);
      debtors.splice(d, 1);
      // Don't increment d, as we just removed the current debtor
    } else {
      d++;
    }
  }

  // 2b) Sort remaining for greedy settle
  debtors.sort((a, b) => b.amount - a.amount);      // largest debtor first
  creditors.sort((a, b) => b.amount - a.amount);    // largest creditor first

  // 3) Greedy settle the rest
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
