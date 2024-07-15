export const UnionTypeNames = {
  User: 'User',
};

export const UserTypes = {};

export const PassportAuthStrategies = {
  jwt: 'jwt',
};

export const PassportAuthStrategyKeys = {
  roles: 'roles',
};

export const EnvKeys = {
  JWT_SECRET: 'JWT_SECRET',
  MONGODB_URI: 'MONGODB_URI',
  MAIL_HOST: 'MAIL_HOST',
  MAIL_USER: 'MAIL_USER',
  MAIL_PASSWORD: 'MAIL_PASSWORD',
  MAIL_FROM: 'MAIL_FROM',
  AWS_ACCESS_KEY_ID: 'AWS_ACCESS_KEY_ID',
  AWS_SECRETE_ACCESS_KEY: 'AWS_SECRETE_ACCESS_KEY',
  AWS_BUCKET: 'AWS_BUCKET',
  AWS_REGION: 'AWS_REGION',
};

export const SchemaNames = {};

export const CommonVariableTypes = {
  boolean: 'boolean',
  string: 'string',
  function: 'function',
  object: 'object',
};

export const CommonArgumentType = {
  body: 'body',
};

export const TrimPipeExcludedKeys = ['password'];

export const RegExFlag = {
  ignoreCase: 'i',
  start: '^',
  end: '$',
};

export const FilePaths = {
  graphqlSchema: 'src/schema.gql',
  firebaseAdminKey: './serviceAccountKey.json',
};

export const SubscriptionTypes = {
  subscriptionsTransportWS: 'subscriptions-transport-ws',
};

export const EmailSubjects = {
  PASSWORD_RESET: 'Password Reset Code',
};

// Mongoose not accepting object keys
export const DESC = 'desc';
export const ASC = 'asc';

export const CommonStrings = {
  empty: '',
  success: 'OK!',
};

export const NotificationMessagePatterns = {};

export const ReplaceableTokens = {
  name: '{Name}',
};
