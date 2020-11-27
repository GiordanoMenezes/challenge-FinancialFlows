import Transaction from '../models/Transaction';

export default class TotalOutcomesService {
  private transactions: Transaction[];

  constructor(transactions: Transaction[]) {
    this.transactions = transactions;
  }

  public execute(): number {
    return this.transactions.reduce((acum, cur) => {
      return cur.type === 'outcome' ? acum + cur.value : acum;
    }, 0);
  }
}
