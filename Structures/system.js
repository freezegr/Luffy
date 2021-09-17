const fs = require('fs');
let db = require("quick.db");
const { SqlDecode, generateUUID } = require('./util.js');
const { characters } = require('../data/characters.json');
// const { items } = require('../data/items.json');

class System {
  /**
   * add character to a user
   * @param {Object} guild
   * @param {Object} user
   * @param {Object} ch - character
   * @return 
   */
   
  addCharacter(guild, user, ch) { 
    if (!ch) ch = characters[0]
    this.fixUser(guild, user);

    let character = ch;
    character.id = user.id + this.newCharacter(guild)

    db.push(SqlDecode(guild.id, user.id, 'characters'), character)
    return;
  }
  
  /**
   * select a character for get xp
   * @param {Object} guild
   * @param {Object} user
   * @param {Strong} charcter
   * @return 
   */

  selected(guild, user, charcter) { 
    db.set(SqlDecode(guild.id, user.id, 'selected'), charcter)
  }
  
  /**
   * get info from a user
   * @param {Object} guild
   * @param {Object} user
   * @return {Object}
   */

  getUser(guild, user) {
    return db.get(SqlDecode(guild.id, user.id))
  }
  
  /**
   * get info from a user
   * @param {Object} guild
   * @param {Object} user
   * @param {String} name
   * @return {String[]}
   */

  findCharacter(guild, user, name) {
    return db.get(SqlDecode(guild.id, user.id, 'characters')).filter(x => x.name == name)
  }
  
  /**
   * make a new id for a character
   * @param {Object} guild
   * @return {String}
   */

  newCharacter(guild) { 
    let id = generateUUID()
    if (db.has(id)) {
      newPlayer(guild.id)
    }

    return id
  }
  
  /**
   * add a random common character to a new character
   * @param {Object} guild
   * @param {Object} user
   * @return 
   */

  newPlayer(guild, user) {
    // addCharacter(guild, user, ch){ 
    this.addCharacter(guild, user/*, this.randomCharacter('common')*/)
	return;
  }
  
  /**
   * remove a character from a user
   * @param {Object} guild
   * @param {Object} user
   * @param {String} character - charcter id 
   * @return 
   */
  
  removeCharacter(guild, user, character) {
    let removed = db.get(SqlDecode(guild.id, user.id, 'characters')).filter(x => x.character != character)
	db.set(SqlDecode(guild.id, user.id, 'characters'), removed)
	return;
  }
  
  /**
   * get a random character
   * types: common | epic |legedery etc
   * @param {Object} type
   * @return {Object}
   */
  
  getRandomCharacter(type) {
    const random = (items) => items[Math.floor(Math.random()*items.length)];
    if(!type){
	 let chars = characters.filter(x => x.type == type)
	 return random(chars)
	}
	return random(characters)
  }

  getCharacterList(filter) {

  }
  
  addItemCharacter(guild, user, item, character) {

  }

  addItemInventory() {

  }
  removeItemInventory() {

  }

  openChest(type) {

  }
  
  /**
   * check if server | user has db
   * @param {Object} guild
   * @param {Object} user
   * @return 
   */

  fixUser(guild, user) {
    if (!db.has(guild.id)) {
      db.set(guild.id, {
        charcters: []
      })
    }

    if (!db.has(SqlDecode(guild.id, user.id))) {
      db.set(SqlDecode(guild.id, user.id), {})
    }
	return;
  }
}

module.exports = System