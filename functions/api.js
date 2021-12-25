import { ddbDocClient } from "../db";

import { ScanCommand } from "@aws-sdk/lib-dynamodb";

const tableName = process.env.DYNAMO_TABLE_NAME;

const getRestaurants = async () => {
  let response = {
    statusCode: 200,
  };

  try {
    const { Items: restaurants } = await ddbDocClient.send(
      new ScanCommand({ TableName: tableName })
    );

    response.body = JSON.stringify(restaurants);
  } catch (error) {
    console.error(error);
    response = {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }

  return response;
};

export { getRestaurants };
