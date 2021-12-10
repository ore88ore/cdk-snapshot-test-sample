import { RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { BillingMode } from "aws-cdk-lib/aws-dynamodb";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

export class CdkSnapshotTestSampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // DynamoDB
    const sampleTable = new dynamodb.Table(this, "sampleTable", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // Lambda
    const sampleLambda = new NodejsFunction(this, "sampleLambda", {
      entry: "lib/sample-lambda.handler.ts",
      environment: {
        TABLE_NAME: sampleTable.tableName,
      },
    });
    sampleTable.grantReadData(sampleLambda);

    // API Gateway
    const sampleApi = new apigateway.RestApi(this, "sample-api");
    sampleApi.root.addMethod(
      "GET",
      new apigateway.LambdaIntegration(sampleLambda)
    );
  }
}
