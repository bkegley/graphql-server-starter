export default {
    Query: {
        getCats: async (parent, args, { Cat }) => {
            const cats = await Cat.find(args)

            return cats.map((cat) => {
                return cat
            })
        },
        getCatById: async (parent, args, { Cat }) => {
            const cat = await Cat.findOne(args)
            return cat
        },
        getDogs: async (parent, args, { Dog }) => {
            const dogs = await Dog.find()

            return dogs
        }
    },
    Mutation: {
        createCat: async (parent, args, { Cat }) => {
            const cat = await new Cat(args).save()
            return cat
        },
        createDog: async (parent, args, { Dog }) => {
            const dog = await new Dog(args).save()
            return dog
        }
    }
}

