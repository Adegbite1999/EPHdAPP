import React, { useState } from 'react'
import Styles from './StakeHistory.module.css';
import clsx from 'clsx';
import {utils} from "ethers";
import { addressShortner, formatDate } from '../../utils/helpers';


const StakeHistory = ({stakeHistory, withdrawHistory}) => {

  return (
    // <div className={Styles.wrapper}> 
    <>
    <div className={Styles.root}>
      <h2 className={Styles.history}>Transaction History</h2>
        <table className= {Styles.table}>
          <thead className = {Styles.table_header}>
              <tr className={Styles.table__head_row}>
                <th className={Styles.table_head_data}>S/N</th>
                <th className={Styles.table_head_data}>Amount</th>
                <th className={Styles.table_head_data}>Account</th>
                <th className={Styles.table_head_data}>Type</th>
                <th className={Styles.table_head_data}>Time</th>
              </tr>
          </thead>
          <tbody>
              
                <tr className={clsx()}>
                    <td className= {Styles.table_data}>
                      {/* {index + 1} */} 1
                    </td>
                    <td className= {Styles.table_data}>
                    1000
                      {/* {Number(utils.formatUnits(item.amount, 18)).toFixed(4)} */}
                    </td>
                    <td className= {Styles.table_data}>
                      0xad...cdex
                      {/* {addressShortner(item.account, false)} */}
                    </td>
                    <td className= {Styles.table_data}>
                      {/* {item.type} */}
                      Withdraw
                    </td>
                    <td className= {Styles.table_data}>
                      {/* {formatDate(item.time)} */}
                      May 31,2022
                    </td>
                  </tr>
              
              
          </tbody>
      
        </table>
    </div>
    </>
  )
}

export default StakeHistory