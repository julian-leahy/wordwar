/** configured like Boogle 🎲 */

const letters = [
    {
        tile: ['R', 'I', 'F', 'O', 'B', 'X']
    },
    {
        tile: ['I', 'F', 'E', 'H', 'E', 'Y']
    },
    {
        tile: ['D', 'E', 'N', 'O', 'W', 'S']
    },
    {
        tile: ['U', 'T', 'O', 'K', 'N', 'D']
    },
    {
        tile: ['H', 'M', 'S', 'R', 'A', 'O']
    },
    {
        tile: ['L', 'U', 'P', 'E', 'T', 'S']
    },
    {
        tile: ['A', 'C', 'I', 'T', 'O', 'A']
    },
    {
        tile: ['Y', 'L', 'G', 'K', 'U', 'E']
    },
    {
        tile: ['R', 'B', 'M', 'J', 'O', 'A']
    },
    {
        tile: ['E', 'H', 'I', 'S', 'P', 'N']
    },
    {
        tile: ['V', 'E', 'T', 'I', 'G', 'N']
    },
    {
        tile: ['B', 'A', 'L', 'I', 'Y', 'T']
    },
    {
        tile: ['E', 'Z', 'A', 'V', 'N', 'D']
    },
    {
        tile: ['R', 'A', 'L', 'E', 'S', 'C']
    },
    {
        tile: ['U', 'W', 'I', 'L', 'R', 'G']
    },
    {
        tile: ['P', 'A', 'C', 'E', 'M', 'D']
    }
]

/**
 * 
 * @param {array} a 
 * @returns shuffled array with a random character from each element
 */
const shuffleArray = (a) => {
    const temp = [];

    while (a.length !== 0) {
        const randomIndex = Math.floor(Math.random() * a.length);
        temp.push(letters[randomIndex]);
        letters.splice(randomIndex, 1);
    }

    const tilesArray = [];
    temp.forEach(({ tile }) => tilesArray.push(tile[Math.floor(Math.random() * 6)]));
    return tilesArray;
}

export const shuffledTiles = shuffleArray(letters)

