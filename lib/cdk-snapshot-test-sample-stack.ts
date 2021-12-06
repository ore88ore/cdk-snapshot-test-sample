import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export class CdkSnapshotTestSampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const sampleLambda = new NodejsFunction(this, "sampleLambda", {
      entry: "lib/sample-lambda.handler.ts",
    });
  }
}
