import { Router } from 'express';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import TotalIncomesService from '../services/TotalIncomesService';
import TotalOutcomesService from '../services/TotalOutcomesService';

const transactionRouter = Router();

const transactionRepository = new TransactionsRepository();

interface ReportTransactionsDTO {
  transactions: Transaction[];
  balance: {
    income: number;
    outcome: number;
    total: number;
  };
}

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionRepository.all();
    const totalIncomesService = new TotalIncomesService(transactions);
    const totalOutcomesService = new TotalOutcomesService(transactions);
    const incomes = totalIncomesService.execute();
    const outcomes = totalOutcomesService.execute();
    return response.json({
      transactions,
      balance: {
        income: incomes,
        outcome: outcomes,
        total: incomes - outcomes,
      },
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const createTransactionService = new CreateTransactionService(
      transactionRepository,
    );
    return response
      .status(201)
      .json(createTransactionService.execute(request.body));
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
