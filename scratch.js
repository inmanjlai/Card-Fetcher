let database = {
    cards: {
        "regrowth": { name: "Regrowth", color: "Green", cmc: 2, type: "Sorcery" },
        "lightning bolt": { name: "Lightning Bolt", color: "Red", cmc: 1, type: "Instant" },
        "dark ritual": { name: "Dark Ritual", color: "Black", cmc: 1, type: "Instant" },
        "llanowar elves": { name: "Llanowar Elves", color: "Green", cmc: 1, type: "Creature" },
        "brainstorm": { name: "Brainstorm", color: "Blue", cmc: 1, type: "Instant" },
        "snapcaster mage": { name: "Snapcaster Mage", color: "Blue", cmc: 2, type: "Creature" },
        "shivan dragon": { name: "Shivan Dragon", color: "Red", cmc: 6, type: "Creature" },
        "omniscience": { name: "Omniscience", color: "Blue", cmc: 9, type: "Enchantment" },
        "lurking predators": { name: "Lurking Predators", color: "Green", cmc: 6, type: "Enchantment" },
        "sol ring": {name: "Sol Ring", color: "Colorless", cmc: 1, type: "Artifact" },
        "planar bridge": { name: "Planar Bridge", color: "Colorless", cmc: 6, type: "Artifact" },
        "ral zarek": { name: "Ral Zarek", color: "Red-Blue", cmc: 4, type: "Planeswalker" },
        "memory plunder": { name: "Memory Plunder", color: "Blue-Black", cmc: 4, type: "Instant" },
        "sylvan reclamation": { name: "Sylvan Reclamation", color: "Green-White", cmc: 5, type: "Instant" },
        "vampiric tutor": { name: "Vampiric Tutor", color: "Black", cmc: 1, type: "Instant" },
        "sepulchral primordial": { name: "Sepulchral Primordial", color: "Black", cmc: 7, type: "Creature"}
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
        } else throw new Error("That commander doesn't exist, try again.");

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

function localTestCases() {
    let newCardFetcher = new cardFetcher(database);

    // console.log(newCardFetcher.getCardInfo("lurking predators"));

    console.log(newCardFetcher.recommendCards('birgi, god of storytelling'))
}

localTestCases();
