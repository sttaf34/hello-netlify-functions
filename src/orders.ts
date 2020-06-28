import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
  Context,
  Callback,
} from "aws-lambda"
import parse from "csv-parse/lib/sync"
import { CSV_STRING } from "./data/orders-csv"

// デプロイ後のエンドポイント
// https://sttaf34-netlify-functions.netlify.app/.netlify/functions/orders

const errorResult: APIGatewayProxyResult = {
  statusCode: 500,
  headers: { "Content-Type": "text/plain" },
  body: "Internal Server Error\n",
}

type Order = {
  id: number
  datetime: string // 注文日
  priceOnOrder: number // 注文価格
  cost: number // 原価
}

export const handler: Handler = (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback
): void => {
  // GET
  // curl -X GET http://localhost:9000/.netlify/functions/orders
  if (event.httpMethod === "GET") {
    let body = ""
    try {
      const orders: Order[] = parse(CSV_STRING, { columns: true })
      body = JSON.stringify(orders)
    } catch (error) {
      callback(null, errorResult)
      return
    }

    const result: APIGatewayProxyResult = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://profitable.netlify.app",
      },
      body,
    }
    callback(null, result)
    return
  }

  // 未対応のHTTPメソッド
  // curl -i -X PUT http://localhost:9000/.netlify/functions/orders
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
