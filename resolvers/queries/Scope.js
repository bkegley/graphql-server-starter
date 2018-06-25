export const query = {
    getScopes: async (parent, args, { models }) => {
        const { Scope } = models
        const scope = await Scope.find(args)
        return scope
    }
}