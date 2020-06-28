import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
  Context,
  Callback,
} from "aws-lambda"

// デプロイ後のエンドポイント
// https://sttaf34-netlify-functions.netlify.app/.netlify/functions/allow-origin

export const handler: Handler = (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback
): void => {
  // GET
  // curl -X GET http://localhost:9000/.netlify/functions/allow-origin

  // JavaScriptのメモを書くときに使えるように、
  // Access-Control-Allow-Origin 設定したものを用意しとく
  if (event.httpMethod === "GET") {
    const randomNumber = Math.floor(Math.random() * 10000)
    const result: APIGatewayProxyResult = {
      statusCode: 200,
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
      },
      body: `${randomNumber}\n`,
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
