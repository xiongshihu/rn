import TYPE from '../constants';
import configs from '../configs';
const { TEST } = TYPE;

const { API } = configs;

export function handleTest( text ){
  return { type: TEST.SAY, data: text }
}

export function handleFetch(data) {
  return {
    type: TEST.FETCH,
    catFetch: API.host + API.getIndex.url || 'http://facebook.github.io/react-native/movies.json',
    catMethod: 'GET',
    catParams: {},
    callback: (err, data, dispatch, getState) => {
      if (err) {
        console.log(err)
      }
    }
  }

}
