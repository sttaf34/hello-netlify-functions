import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
  Context,
  Callback,
} from "aws-lambda"

// デプロイ後のエンドポイント
// https://sttaf34-netlify-functions.netlify.app/.netlify/functions/parrot

const getCode = (event: APIGatewayProxyEvent): number => {
  if (event.queryStringParameters === null) {
    return 200
  }
  if (event.queryStringParameters.code === undefined) {
    return 200
  }

  const { code } = event.queryStringParameters
  if ([200, 404, 500].includes(Number(code))) {
    return Number(code)
  }

  return 200
}

export const handler: Handler = (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback
): void => {
  // 未対応のHTTPメソッド
  // curl -i -X PUT http://localhost:9000/.netlify/functions/parrot
  if (event.httpMethod !== "GET") {
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

  // GET
  // curl -X GET http://localhost:9000/.netlify/functions/parrot?code=200
  // curl -s -I -X GET http://localhost:9000/.netlify/functions/parrot?code=404
  const code = getCode(event)
  const result: APIGatewayProxyResult = {
    statusCode: code,
    headers: {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
    },
    body: `${code}\n`,
  }
  callback(null, result)
}
