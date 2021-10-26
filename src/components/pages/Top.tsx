import { useDispatch, useSelector } from 'react-redux';
import postProductAction from '../postProductAction';
import { RootState } from '../store';
import Link from '../Link';

const postData = {
  "sympton": "睡眠不足"
}

const Top = () => {
  const dispatch = useDispatch()
  const buttonAlert = () => {
    dispatch(postProductAction(postData))
  }

  // const state = useSelector((state:RootState) => state.getCatReducer)
  const state = useSelector((state: RootState) => state.postProductReducer)

  return (
    <div>
      <p>Product Data List .</p>
      <button onClick={buttonAlert}>get product</button>
      <br />
      <label>{state.status}</label>
      <br />
      <label>{state.prodID}</label>
      <br />
      <label>{state.prodName}</label>
      <br />
      <label>{state.description}</label>
      <br />
      <label>{state.price}</label>
      <br />
      <label>{state.date}</label>
      <br />
      <label>{state.calory}</label>
      <br />
      <label>{state.protein}</label>
      <br />
      <label>{state.lipid}</label>
      <br />
      <label>{state.carbonhydrates}</label>
      <br />
      <label>{state.sugar}</label>
      <br />
      <label>{state.fiber}</label>
      <br />
      <label>{state.scequiv}</label>
      <br />
      <label>{state.region}</label>
      <br />
      <label>{state.allergy}</label>
      <br />
      <img src={state.figURL} />
    </div>
  )
}

export default Top;
