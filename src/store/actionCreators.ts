import * as actionTypes from "./actionTypes";
import { tezosToolkit } from "../api";

export function getTzBalance(key: string) {
  return async (dispatch: DispatchType) => {
    dispatch({ type: actionTypes.GET_BALANCE_START });

    try {
      const tzBalance = await tezosToolkit.tz.getBalance(key)

      dispatch({
        type: actionTypes.GET_BALANCE_SUCCESS ,
        payload: { [key]: tzBalance.toString() }
      })
    } catch (error: any) {
      dispatch({
        type: actionTypes.GET_BALANCE_ERROR ,
        payload: { error: error.message }
      });
    }
  };
}

export function removeBalancesItem(key: string) {
  return { type: actionTypes.REMOVE_BALANCE, payload: key }
}

export function setBalances(balances: IBalances) {
  return { type: actionTypes.SET_BALANCES, payload: { ...balances }}
}