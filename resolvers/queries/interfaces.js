export const CommentInterface = {
    __resolveType: (parent, args, context) => {
        if (parent.isArticleComment) {
            return 'ArticleComment'
        }
        return 'Comment'
    }
}