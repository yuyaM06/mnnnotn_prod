import axios from 'axios';
import { Action, POST_PRODUCT_REQUEST, POST_PRODUCT_SUCCESS, POST_PRODUCT_FAILURE } from './action';

const postProductRequest = (): Action => {
  return {
    type: POST_PRODUCT_REQUEST,
    payload: null
  }
}

const postProductSuccess = (json: any): Action => {  //Objectだとunknownが渡されてうまく動かなかった
  return {
    type: POST_PRODUCT_SUCCESS,
    payload: json
  }
}

const postProductFailure = (error: Object): Action => {
  return {
    type: POST_PRODUCT_FAILURE,
    payload: error
  }
}

/* for debug */
// const data = {
//   "sympton": "睡眠不足"
// }

// Loadingしている風の時間 [msec]
const loadTime = 2000

const postProductAction = (postData: any) => {
  return async (dispatch: any) => {
    console.log("待機前だよ")
    dispatch(postProductRequest())
    console.log("待機中だよ")
    await new Promise(resolve => setTimeout(resolve, loadTime)) //loadTimeだけ待つ
    console.log("待機後だよ")
    return await axios.post('http://localhost:3100/product/', postData)
      .then(res => {
        console.log(res.data)
        console.log("dispatch start")
        dispatch(postProductSuccess(res.data))
        console.log("dispatch end")
      }
      ).catch(err => {
        console.log(err)
        dispatch(postProductFailure(err))
      })
  }
}


export default postProductAction;
