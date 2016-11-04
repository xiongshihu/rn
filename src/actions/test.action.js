import TYPE from '../constants';
const { TEST } = TYPE;

export function handleTest( text ){
  return { type: TEST.SAY, data: text }
}
