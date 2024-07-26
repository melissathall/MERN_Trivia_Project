/*          __                        __         
           /\ \                      /\ \        
 _ __    __\ \ \___      __      ____\ \ \___    
/\`'__\/'__`\ \  _ `\  /'__`\   /',__\\ \  _ `\  
\ \ \//\  __/\ \ \ \ \/\ \L\.\_/\__, `\\ \ \ \ \ 
 \ \_\\ \____\\ \_\ \_\ \__/.\_\/\____/ \ \_\ \_\
  \/_/ \/____/ \/_/\/_/\/__/\/_/\/___/   \/_/\/_/

    Given to a Coding Dojo alumni by Riot Games.
    Rehash an incorrectly hashed string by combining letter count occurrences
    and alphabetizing them.
*/
//               V
const str1 = "b70a164c32a20c10";
const expected1 = "a184b70c42";
// RIOT

// 1. DRIVER 🚗
// 2. PRESENTER 👨‍🏫
// 3. NAVIGATOR 🧭

// hints
// isNaN
// parseInt()
// Object.hasOwn()

function reHash(str) {
    let emptyObj = {}
    let numStr = ""
    for (let i = 0; i < str.length; i++) {
        let tempKey = str[i]
        if (isNaN(str[i])) { //if true its a letter
            if (!Object.hasOwn(emptyObj, str[i])) {
                emptyObj[tempKey] = 0 // assigns the letter to the obj key with value of 0
            } else {
                // check if the letter exists in the emptyObj
                emptyObj[tempKey] += parseInt(numStr)
                tempKey = ""
            }
            numStr = ""
        }
        else {
            while (i < str.length && !isNaN(str[i])) {
                numStr += str[i];
                i++;
            }
            console.log(numStr)
            i-- //the for loop also increments i so we are moving i backwards
        }
    }
    console.log(emptyObj)
}

reHash(str1)
