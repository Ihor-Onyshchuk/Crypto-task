import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import {
  getTzBalance,
  removeBalancesItem,
  setBalances
} from './store/actionCreators';

import './index.css';

const App: React.FC = () => {
  const [ walletAddress, setWalletAddress ] = useState<string>('');
  const btnDisabled = !walletAddress.trim();

  const dispatch: Dispatch<any> = useDispatch();

  const balances: IBalances = useSelector(
    (state: BalancesState) => state.balances
  );
  const balancesError: string = useSelector(
    (state: BalancesState) => state.getBalanceError
  );
  const balancesProgress: string = useSelector(
    (state: BalancesState) => state.getBalanceProgress
  );

  useEffect((): void => {
    const savedBalances = localStorage.getItem('balances');

    if (savedBalances) {
      dispatch(setBalances(JSON.parse(savedBalances)))
    }
  }, [])

  useEffect((): void => {
    localStorage.setItem('balances', JSON.stringify(balances))
  }, [balances])

  const handelAddKey = (): void => {
    if (btnDisabled) {
      return;
    }

    dispatch(getTzBalance(walletAddress));
    setWalletAddress('')
  }

  const handleRemoveKey = (key: string): void => {
    dispatch(removeBalancesItem(key))
  }

  const handleChangeKey = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setWalletAddress(e.target.value)
  }

  return (
    <div className="tezos-balances">
      <div className="container">
        <div className="add-key-wrapper">
          <input 
            className="add-key-input"
            type="text"
            placeholder="Enter your pkh here"
            value={walletAddress}
            onChange={(e) => handleChangeKey(e)}
          />
          <button
            className={
              `add-key-button ${balancesProgress === 'start' ? 'button--loading' : ''}
            `}
            onClick={handelAddKey}
            disabled={btnDisabled}
          >
            <span className="button-text">Add</span>
          </button>
        </div>
        {
          balancesError && (
            <div className="alert">
              Something goes wrong! Check your public key hash!
            </div>
          )
        }

        <h2>Balances</h2>
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Amount</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {balances && Object.keys(balances).map(addressKey => (
              <tr key={addressKey}>
                <td>
                  <span title={addressKey}>{addressKey}</span>
                </td>
                <td>{balances[addressKey]}</td>
                <td>
                  <button
                    className="remove-key-button"
                    onClick={() => handleRemoveKey(addressKey)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
