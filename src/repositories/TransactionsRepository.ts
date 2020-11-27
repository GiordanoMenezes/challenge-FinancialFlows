import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.transactions.reduce(
      (acum, cur) => {
        if (cur.type === 'income') {
          return {
            ...acum,
            income: acum.income + cur.value,
            total: acum.income + cur.value - acum.outcome,
          };
        }
        return {
          ...acum,
          outcome: acum.outcome + cur.value,
          total: acum.income - acum.outcome - cur.value,
        };
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction: Transaction = new Transaction({
      title,
      value,
      type,
    });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
