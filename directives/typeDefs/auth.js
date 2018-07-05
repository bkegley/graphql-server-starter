export default `
    directive @isAuthenticated on FIELD_DEFINITION | OBJECT
    directive @hasScope(scope: String!) on FIELD_DEFINITION | OBJECT
`