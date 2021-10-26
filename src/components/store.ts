export interface RootState {
  postProductReducer: ProductState,
  loginReducer: LoginState
}

export interface ProductState {
  status: string,
  productShowFlag: boolean,  // 画面表示切り替え用フラグ
  loadingFlag: boolean,  // 画面表示切り替え用フラグ
  prodID: Number,
  prodName: string,
  description: string,
  price: Number,
  figURL: string,
  date: string,
  calory: Number,
  protein: Number,
  lipid: Number,
  carbonhydrates: Number,
  sugar: Number,
  fiber: Number,
  scequiv: Number,
  region: Array<string>,
  allergy: Array<string>,
  lastUpdated: Number
}

export interface LoginState {
  status: string,
  userID: string,
  password: string
}
