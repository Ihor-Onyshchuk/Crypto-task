interface IBalances {
  [key: string]: string,
}

type BalancesState = {
  balances: IBalances<object>,
  getBalanceProgress: string,
  getBalanceError: string,
};

type BalancesAction = {
  type: string;
  payload?: any;
};

type DispatchType = (args: BalancesAction) => BalancesAction;