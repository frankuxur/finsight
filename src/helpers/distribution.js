export const computeDistribution = (data) => {
    let result = data.categories.reduce((acc, curr) => {
        if (!acc[curr.category]) {
            acc[curr.category] = { category: curr.category, amount: curr.amount }
        } else {
            acc[curr.category].amount += curr.amount
        }
        return acc
    }, {})
    
    result = Object.entries(result).map(([_, item]) => item)

    // convert to %, then round off to 2 decimals and then sort in descending
    result = result.map(({category, amount}) => ({ category, amount, percentage: Math.round((amount*100/data.total) * 100) / 100 }))
                   .sort((a, b) => b.percentage - a.percentage)

    if (result.length > 3) {
        const temp = result.slice(3)
                           .reduce((acc, curr) => {
                                acc.amount += curr.amount
                                acc.percentage += curr.percentage
                                return acc
                           }, {category: 'Others', amount: 0, percentage: 0})
        result = result.slice(0, 3).concat(temp)
    }               


    return result
}

export const classify = (data) => {
    const result = data.map(({type, category, amount}) => ({type, category, amount: +amount}))
                .reduce((acc, curr) => {
                if (curr.type === 'Credit') {
                    acc.credits.categories.push({ category: curr.category, amount: curr.amount })
                    acc.credits.total += curr.amount
                } else {
                    acc.debits.categories.push({ category: curr.category, amount: curr.amount })                                
                    acc.debits.total += curr.amount                                
                }

                return acc
                }, { credits: { categories: [], total: 0 }, debits: { categories: [], total: 0 } }) 

    return result                
}