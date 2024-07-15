export const ValidationNumbers = {
  minimumPasswordLength: 8,
  minimumNameLength: 3,
};

export const CommonNumbers = {
  zero: 0,
  one: 1,
  // JWT token expires in seconds, 30 Days
  jwtExpiresIn: 60 * 60 * 24 * 30,
  maxOTP: 9999,
  // In milliseconds, 5 Mins
  resetPasswordTokenExpiresIn: 5 * 60 * 1000,
  // 2 Aws signed key expires in 5 Mins
  awsPresignedKeyExpiresIn: 5 * 60,
};

export const S3Actions = {
  getObject: 'getObject',
};

export const AwsConditions = {
  startsWith: 'starts-with',
  contentLengthRange: 'content-length-range',
};

export const AwsPaths = {
  temp: 'temp/',
};

export const AwsConditionKeys = {
  contentType: '$Content-Type',
};

export const AwsConditionPatterns = {
  imageOnly: 'image/',
};

export const MegaByteToByteValues = {
  zero: 0,
  five: 5 * 1024 * 1024,
};

export const CommonPorts = {
  ServerPort: 3000,
};

export const CommonDelays = {
  keepAlive: 55000,
};
