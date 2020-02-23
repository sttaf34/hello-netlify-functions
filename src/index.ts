import {
  APIGatewayProxyEvent,
  APIGatewayProxyCallback,
  APIGatewayProxyResult
} from "aws-lambda"

exports.handler = (
  event: APIGatewayProxyEvent,
  context: never,
  callback: APIGatewayProxyCallback
): void => {
  // 未対応のHTTPメソッド
  // curl -i -X PUT http://localhost:9000/index
  if (["GET", "POST"].includes(event.httpMethod) === false) {
    const result: APIGatewayProxyResult = {
      statusCode: 405,
      headers: {
        // eslint-disable-next-line prettier/prettier
        "Allow": "GET, POST",
        "Content-Type": "text/plain"
      },
      body: "Method Not Allowed\n"
    }
    callback(null, result)
    return
  }

  // GET
  // curl -X GET http://localhost:9000/index
  if (event.httpMethod === "GET") {
    const result: APIGatewayProxyResult = {
      statusCode: 200,
      headers: { "Content-Type": "text/plain" },
      body: "Hello Netlify Functions GET!\n"
    }
    callback(null, result)
    return
  }

  // POST
  // curl -X POST http://localhost:9000/index -d "name=sttaf34&age=38"
  const result: APIGatewayProxyResult = {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `Hello Netlify Functions POST! (${event.body})\n`
  }
  callback(null, result)
}
