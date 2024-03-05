import { GraphQLScalarType } from 'graphql';

function decode(hash: unknown): string | never {
  console.log({ decode: hash });
  return `${hash as string}`.replace('*', '').replace('*', '');
}
function encode(id: unknown): string | never {
  console.log({ encode: id });
  return ('*' + id + '*') as string;
}

export const HashedIDScalar = new GraphQLScalarType({
  name: 'HashedID',
  description: 'HashedID',
  serialize: (value: unknown) => encode(value),
  parseValue: (value: unknown) => decode(value),
  parseLiteral: (ast: any) => decode(ast.value),
});
