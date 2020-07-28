import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
  Context,
  Callback,
} from "aws-lambda"

// デプロイ後のエンドポイント
// https://sttaf34-netlify-functions.netlify.app/.netlify/functions/no-response

// タイムアウト短めにするとレスポンスが返る前にタイムアウトになる
// curl -m 2 http://localhost:9000/.netlify/functions/no-response

const fibonacci = (aNumber: number): number => {
  if (aNumber === 0) {
    return 0
  }
  if (aNumber === 1) {
    return 1
  }
  return fibonacci(aNumber - 1) + fibonacci(aNumber - 2)
}

export const handler: Handler = (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback
) => {
  const fibonacciResult = fibonacci(43)
  const result: APIGatewayProxyResult = {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `${fibonacciResult}\n`,
  }
  callback(null, result)
}
