import { CognitoUserPool } from "amazon-cognito-identity-js";
import envVars from "../../config";

const poolData = {
  UserPoolId: envVars.UserPoolId,
  ClientId: envVars.ClientId,
};

export default new CognitoUserPool(poolData);
