import { ProductState } from './store';
import { Action, POST_PRODUCT_REQUEST, POST_PRODUCT_SUCCESS, POST_PRODUCT_FAILURE } from './action';

const initalState: ProductState = {
  status: "",
  prodID: 0,
  prodName: "",
  description: "",
  price: 0,
  figURL: "",
  date: "",
  calory: 0,
  protein: 0,
  lipid: 0,
  carbonhydrates: 0,
  sugar: 0,
  fiber: 0,
  scequiv: 0,
  region: [],
  allergy: [],
  lastUpdated: Date.now(),
  productShowFlag: false,
  loadingFlag: false

}

const postProductReducer = (state: ProductState = initalState, action: Action): ProductState => {
  switch (action.type) {
    case POST_PRODUCT_REQUEST:
      return ({
        status: "Fetching",
        prodID: 0,
        prodName: "",
        description: "",
        price: 0,
        figURL: "",
        date: "",
        calory: 0,
        protein: 0,
        lipid: 0,
        carbonhydrates: 0,
        sugar: 0,
        fiber: 0,
        scequiv: 0,
        region: [],
        allergy: [],
        lastUpdated: Date.now(),
        productShowFlag: false,
        loadingFlag: true
      })
    case POST_PRODUCT_SUCCESS:
      return ({
        status: "Success",
        prodID: action.payload.prodID,
        prodName: action.payload.prodName,
        description: action.payload.description,
        price: action.payload.price,
        figURL: action.payload.figURL,
        date: action.payload.date,
        calory: action.payload.calory,
        protein: action.payload.protein,
        lipid: action.payload.lipid,
        carbonhydrates: action.payload.carbonhydrates,
        sugar: action.payload.suger,
        fiber: action.payload.fiber,
        scequiv: action.payload.scequiv,
        region: action.payload.region,
        allergy: action.payload.allergy,
        lastUpdated: Date.now(),
        productShowFlag: true,
        loadingFlag: false
      })
    case POST_PRODUCT_FAILURE:
      return ({
        status: "Failure",
        prodID: 0,
        prodName: "",
        description: "",
        price: 0,
        figURL: "",
        date: "",
        calory: 0,
        protein: 0,
        lipid: 0,
        carbonhydrates: 0,
        sugar: 0,
        fiber: 0,
        scequiv: 0,
        region: [],
        allergy: [],
        lastUpdated: Date.now(),
        productShowFlag: false,
        loadingFlag: true
      })
    default:
      return state
  }
}

export default postProductReducer;
