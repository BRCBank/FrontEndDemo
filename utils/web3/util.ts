
import BigNumber from "bignumber.js";

export function toDecimalNumber(input: number| string| BigNumber, decimal: number, round: number = decimal){
  let temp = new BigNumber(input).dividedBy(10**decimal).toFixed(round);
  return temp.replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');

}


export function fromDecimalNumber(input: number| string| BigNumber, decimal: number){
  return new BigNumber(input).multipliedBy(10**decimal).toFixed(0);
}
