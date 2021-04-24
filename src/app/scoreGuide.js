/**
 * 
 * @param {string} word 
 * @returns score based on length
 */

const scoreGuide = (word) => {
    switch (word.length) {
        case 3:
            return (1)
        case 4:
            return (1)
        case 5:
            return (2)
        case 6:
            return (3)
        case 7:
            return (4)
        default:
            return (11)
    }
}

export default scoreGuide;