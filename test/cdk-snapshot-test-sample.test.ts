import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { CdkSnapshotTestSampleStack } from "../lib/cdk-snapshot-test-sample-stack";

test("snapshot test", () => {
  const app = new cdk.App();
  const stack = new CdkSnapshotTestSampleStack(app, "MyTestStack");
  const template = Template.fromStack(stack).toJSON();

  expect(template).toMatchSnapshot();
});
