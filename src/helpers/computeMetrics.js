export const computeMetrics = (transactions) => {
    const result = transactions.reduce((acc, curr) => {
        const { amount, type } = curr
        if (type === 'Credit') {
            acc.inc = acc.inc + +amount
        } else {
            acc.exp = acc.exp + +amount
        }
        acc.final = acc.inc - acc.exp
        return acc
    }, {inc: 0, exp: 0, final: 0})
    
    return result
}