export type Action = {
  type: String,
  payload: any
}

// Action リクエスト送信前
export const POST_PRODUCT_REQUEST = 'POST_PRODUCT_REQUEST'
// Action レスポンス受信
export const POST_PRODUCT_SUCCESS = 'POST_PRODUCT_SUCCESS'
// Action エラー
export const POST_PRODUCT_FAILURE = 'POST_PRODUCT_FAILURE'
