import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
  Context,
  Callback,
} from "aws-lambda"

// デプロイ後のエンドポイント
// https://sttaf34-netlify-functions.netlify.app/.netlify/functions/index

export const handler: Handler = (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback
): void => {
  // GET
  // curl -X GET http://localhost:9000/.netlify/functions/index
  if (event.httpMethod === "GET") {
    const result: APIGatewayProxyResult = {
      statusCode: 200,
      headers: { "Content-Type": "text/plain" },
      body: "Hello Netlify Functions GET!\n",
    }
    callback(null, result)
    return
  }

  // POST
  // curl -X POST http://localhost:9000/.netlify/functions/index -d "age=38"
  if (event.httpMethod === "POST") {
    const result: APIGatewayProxyResult = {
      statusCode: 200,
      headers: { "Content-Type": "text/plain" },
      body: `Hello Netlify Functions POST! (${event.body})\n`,
    }
    callback(null, result)
    return
  }

  // 未対応のHTTPメソッド
  // curl -i -X PUT http://localhost:9000/.netlify/functions/index
  const result: APIGatewayProxyResult = {
    statusCode: 405,
    headers: {
      // eslint-disable-next-line prettier/prettier
      "Allow": "GET, POST",
      "Content-Type": "text/plain",
    },
    body: "Method Not Allowed\n",
  }
  callback(null, result)
}
