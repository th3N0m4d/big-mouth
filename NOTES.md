# Ideas to Improve the Project

## Github Actions

- add a `.github` folder and under it, create another folder `workflows`
- once these folders are created, add a `.yml` file with the configuration

## DynamoDB

- use the package `@aws-sdk/dynamodb` as this package is smaller than say `@aws` lib

### Batch Write

```bash
aws dynamodb batch-write-item  --request-items  file://partiql.json
```

## Serverless

### Local Run

```bh
serverless invoke local --function functionName
```

## AWS Client

### Create Table

```bh
aws dynamodb create-table \
    --table-name Restaurants \
    --attribute-definitions \
        AttributeName=name,AttributeType=S \
    --key-schema \
        AttributeName=name,KeyType=HASH \
    --provisioned-throughput \
        ReadCapacityUnits=1,WriteCapacityUnits=1
```

## Misc

- Because Lambda functions run in an isolated environment, you get access to environment variables such as Region out of the box. For a list of the variables you have access to, please [visit](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html) the official docs.

## Elastic Search

## Caching
