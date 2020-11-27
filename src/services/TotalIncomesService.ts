import Transaction from '../models/Transaction';

export default class TotalIncomesService {
  private transactions: Transaction[];

  constructor(transactions: Transaction[]) {
    this.transactions = transactions;
  }

  public execute(): number {
    return this.transactions.reduce((acum, cur) => {
      return cur.type === 'income' ? acum + cur.value : acum;
    }, 0);
  }
}
