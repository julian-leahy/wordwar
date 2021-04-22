import { dictionary } from './dictionary.js'

class TrieNode {
    constructor(parent, value) {
        this.parent = parent;
        this.children = new Array(26);
        this.isWord = false;
        if (parent !== undefined) {
            parent.children[value.charCodeAt(0) - 97] = this;
        }
    }
};

/**
 * Create trie data structure
 * @param {array} dict 
 */
let MakeTrie = function (dict) {
    let root = new TrieNode(undefined, '');
    for (let word of dict.values()) {
        let curNode = root;
        for (let i = 0; i < word.length; i++) {
            let letter = word[i];
            let ord = letter.charCodeAt(0);
            if ((97 <= ord) < 123) {
                let nextNode = curNode.children[ord - 97];
                if (nextNode === undefined) {
                    nextNode = new TrieNode(curNode, letter);
                }
                curNode = nextNode;
            }
        }
        curNode.isWord = true;
    }
    return root;
};
let Words = function (grid, dict, mustHave) {
    let rows = grid.length;
    let cols = grid[0].length;
    let queue = [];
    let words = new Set();
    for (let y = 0; y < cols; y++) {
        for (let x = 0; x < rows; x++) {
            let c = grid[y][x];
            let ord = c.charCodeAt(0);
            let node = dict.children[ord - 97];
            if (node !== undefined) {
                queue.push([x, y, c, node, [[x, y]]]);
            }
        }
    }
    while (queue.length !== 0) {
        let [x, y, s, node, h] = queue.pop();
        for (let [dx, dy] of [[1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1]]) {
            let [x2, y2] = [x + dx, y + dy];
            if (h.find(function (el) {
                return el[0] === x2 && el[1] === y2;
            }) !== undefined) {
                continue;
            }
            if (0 <= x2 && x2 < cols && 0 <= y2 && y2 < rows) {
                let newHist = h.slice();
                newHist.push([x2, y2]);
                let s2 = s + grid[y2][x2];
                let node2 = node.children[grid[y2][x2].charCodeAt(0) - 97];
                if (node2 !== undefined) {
                    if (node2.isWord) {
                        if (mustHave === undefined || s2.indexOf(mustHave) !== -1)
                            words.add(s2);
                    }
                    queue.push([x2, y2, s2, node2, newHist]);
                }
            }
        }
    }
    return words.values()
}

/**
 * Find available words
 * @param {array} board 
 * return number of available words
 */
const getAvailableWords = (board) => {
    let dictArr = dictionary.split(' ');
    let trie = new MakeTrie(dictArr);
    let wordList = Array.from(Words(toMatrix(board, 4), trie));
    console.log("getAvailableWords -> wordList", wordList);
    return (wordList);

}

const toMatrix = (list, subArr) => {
    var matrix = [], i, k;
    let transformed = [];

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % subArr === 0) {
            k++;
            matrix[k] = [];
        }
        matrix[k].push(list[i]);
    }

    matrix.forEach(e => {
        transformed.push(e.join('').toLowerCase())
    })

    return transformed;
}

export default getAvailableWords

