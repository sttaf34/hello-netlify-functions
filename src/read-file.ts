import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
  Context,
  Callback,
} from "aws-lambda"
import { readFileSync } from "fs"
import parse from "csv-parse/lib/sync"

// デプロイ後のエンドポイント
// https://sttaf34-netlify-functions.netlify.app/.netlify/functions/read-file

type Order = {
  id: number
  datetime: string // 注文日
  priceOnOrder: number // 注文価格
  cost: number // 原価
}

const getOrders = (): string => {
  const data = readFileSync("./assets/orders.csv")
  const orders: Order[] = parse(data, { columns: true })
  // TODO: エラー対応
  return JSON.stringify(orders)
}

export const handler: Handler = (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback
): void => {
  // GET
  // curl -X GET http://localhost:9000/.netlify/functions/read-file
  if (event.httpMethod === "GET") {
    const orders = getOrders()
    const result: APIGatewayProxyResult = {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: orders,
    }
    callback(null, result)
    return
  }

  // 未対応のHTTPメソッド
  // curl -i -X PUT http://localhost:9000/.netlify/functions/allow-origin
  const result: APIGatewayProxyResult = {
    statusCode: 405,
    headers: {
      // eslint-disable-next-line prettier/prettier
      "Allow": "GET",
      "Content-Type": "text/plain",
    },
    body: "Method Not Allowed\n",
  }
  callback(null, result)
}
