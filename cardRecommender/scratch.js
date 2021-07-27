let database = {
    cards: {
        "regrowth": { name: "Regrowth", color: "Green", cmc: 2, type: "Sorcery", img: "./imgs/regrowth.png" },
        "lightning bolt": { name: "Lightning Bolt", color: "Red", cmc: 1, type: "Instant", img: "./imgs/lightningbolt.png" },
        "dark ritual": { name: "Dark Ritual", color: "Black", cmc: 1, type: "Instant", img: "./imgs/darkritual.png"},
        "llanowar elves": { name: "Llanowar Elves", color: "Green", cmc: 1, type: "Creature", img: "./imgs/llanowarelves.png" },
        "brainstorm": { name: "Brainstorm", color: "Blue", cmc: 1, type: "Instant", img: "./imgs/brainstorm.png" },
        "snapcaster mage": { name: "Snapcaster Mage", color: "Blue", cmc: 2, type: "Creature", img: "./imgs/snapcastermage.png" },
        "shivan dragon": { name: "Shivan Dragon", color: "Red", cmc: 6, type: "Creature",img: "./imgs/shivandragon.png" },
        "omniscience": { name: "Omniscience", color: "Blue", cmc: 9, type: "Enchantment", img: "./imgs/omniscience.png" },
        "lurking predators": { name: "Lurking Predators", color: "Green", cmc: 6, type: "Enchantment", img: "./imgs/lurkingpredators.png" },
        "sol ring": {name: "Sol Ring", color: "Colorless", cmc: 1, type: "Artifact", img: "./imgs/solring.png" },
        "planar bridge": { name: "Planar Bridge", color: "Colorless", cmc: 6, type: "Artifact", img: "./imgs/planarbridge.png" },
        "ral zarek": { name: "Ral Zarek", color: "Red-Blue", cmc: 4, type: "Planeswalker", img: "./imgs/ralzarek.png" },
        "memory plunder": { name: "Memory Plunder", color: "Blue-Black", cmc: 4, type: "Instant", img: "./imgs/memoryplunder.png" },
        "sylvan reclamation": { name: "Sylvan Reclamation", color: "Green-White", cmc: 5, type: "Instant", img: "./imgs/sylvanreclamation.png" },
        "vampiric tutor": { name: "Vampiric Tutor", color: "Black", cmc: 1, type: "Instant", img: "./imgs/vampirictutor.png" },
        "sepulchral primordial": { name: "Sepulchral Primordial", color: "Black", cmc: 7, type: "Creature", img: "./imgs/sepulchralprimordial.png"}
    },

    commanders: {
        "selvala, explorer returned": { name:  "Selvala, Explorer Returned", color: "Green-White" },
        "lazav, dimir mastermind": { name: "Lazav, Dimir Mastermind", color: "Blue-Black" },
        "yawgmoth, thran physician": { name: "Yawgmoth, Thran Physician", color: "Black" },
        "birgi, god of storytelling": { name: "Birgi, God of Storytelling", color: "Red" }
    }
}

class cardFetcher {
    constructor(database){
        this.database = database;
    }

    getCardInfo(name){
        return this.database.cards[name];

    }

    capitalizeFirstLetter(string){
        let split = string.split(' ');
        let newWord = '';
        for(let i = 0; i < split.length; i++){
            let word = split[i];
            newWord += word[0].toUpperCase();
            newWord += word.slice(1);
            if(!(i === split.length - 1)){
                newWord += " ";
            }
        }
        return newWord;
    }

    // RECOMMEND CADS FOR A DECK SORTED BY CMC, CARDS SHOULD MATCH COMMANDERS COLOR IDENTITY ->
    recommendCards(commanderName){
        let recommendations = [];
        let commandersColor;
        if(commanderName in this.database.commanders){
            commandersColor = this.database.commanders[commanderName].color;
        } else alert("That commander doesn't exist, try again.");

        for(let card in this.database.cards){
            let currentCard = this.database.cards[card];

            if(commandersColor.includes(currentCard.color)){
                recommendations.push(currentCard);
            }
        }
        recommendations.sort((card1, card2) => {
            let firstCMC = card1.cmc;
            let secondCMC = card2.cmc;
            if(firstCMC === secondCMC) return 0;
            else if(firstCMC > secondCMC) return 1
            else return -1;
        })
        return recommendations;
    }

    // THIS IS THE END OF THE CLASS
}

function showRecommendations(){
    let fetch = new cardFetcher(database);
    let commanderName = document.querySelector('#commander-name').value;
    
    let recommendations = fetch.recommendCards(commanderName);

    console.log(recommendations);

    document.querySelector(".mainState").style.display="none";
    document.querySelector(".recommendState").style.display="grid";

    let j = 1;
    for(let i = 0; i < recommendations.length; i++){
        let currentCard = recommendations[i];
        document.querySelector(`.card${j}`).style.visibility="visible";
        document.querySelector(`.card${j}`).src=currentCard.img;
        j++;
    }

    
}

function changeLarge(state){
    let card = document.querySelector(state).src;
    console.log(card);
    document.querySelector(state).src=card;
}