import * as actionTypes from "./actionTypes";

const initialState: BalancesState = {
  balances: {},
  getBalanceProgress: '',
  getBalanceError: '',
}

const balancesReducer = (
  state: BalancesState = initialState,
  action: BalancesAction
): BalancesState => {
  switch (action.type) {
    case actionTypes.GET_BALANCE_START:
      return {
        ...state,
        getBalanceProgress: 'start',
        getBalanceError: '',
      }
    case actionTypes.GET_BALANCE_ERROR:
      return {
        ...state,
        getBalanceProgress: 'error',
        getBalanceError: `${action.payload.error}`,
      }
    case actionTypes.GET_BALANCE_SUCCESS:
      return {
        ...state,
        getBalanceProgress: 'success',
        getBalanceError: '',
        balances: {
          ...state.balances,
          ...action.payload
        }
      }
    case actionTypes.SET_BALANCES:
      return {
        ...state,
        balances: { ...action.payload },
      }
    case actionTypes.REMOVE_BALANCE:
      const newBalances: IBalances = { ...state.balances };
      delete newBalances[action.payload];

      return {
        ...state,
        balances: newBalances,
      }
    default:
      return state;
  }
}

export default balancesReducer;