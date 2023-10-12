import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://info-site.test/graphql',
  documents: ['documents/**/*.graphql'],
  generates: {
    'generates/gql/': {
      preset: 'client',
    }
  }
}
export default config