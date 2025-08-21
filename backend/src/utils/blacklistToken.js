
/**
 * Esta constante é uma lista negra para
 * tokens.
 */
const blacklist = new Set();

/**
 * Esta arrow function serve para adicionar um
 * token na lista negra.
 * 
 * @param {string} token 
 */
const addToBlacklist = (token) => {
  blacklist.add(token);
};

module.exports = {
    blacklist,
    addToBlacklist
};
