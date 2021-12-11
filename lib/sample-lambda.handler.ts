import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const client = new DocumentClient({ region: "ap-northeast-1" });
  const res = await client
    .scan({
      TableName: process.env.TABLE_NAME as string,
    })
    .promise();
  const responseBody = {
    count: res.Count ?? 0,
    samples: res.Items ?? [],
  };

  return {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  };
};
