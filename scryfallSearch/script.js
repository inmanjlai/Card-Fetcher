let searchButton = document.querySelector(".submit");

async function find(cardName) {

    

    let req = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${cardName}`);
        let res = await req.json();
        let resBody = res;

        console.log(resBody);
    
        let details = {
            cardName: resBody.name,
            type: resBody.type_line,
            cmc: resBody.mana_cost,
            description: resBody.oracle_text,
            img: resBody.image_uris.normal
        }
        
        
        document.querySelector(".card").innerHTML=
        `
        <div class="cardDetails">
            <h3>${details.cardName}</h3>
            <p>${details.type}</p>
            <p>${details.cmc}</p>
            <p>${details.description}</p>
        </div>
        <img src="${details.img}" class="cardImg">
        `
}

searchButton.addEventListener(("click"), () => {
    const input = document.getElementById("search-bar").value;

    if(input === undefined) {
        console.log("Error: input was undefined");
        return;
    } else if(!input){
        console.log("Error: input was empty")
        return;
    }

    find(input);
})



































// const fetch = require('node-fetch');

// TRY THIS ONCE YOU ARE COMFY WITH EVENT LISTENERS ->

// searchButton.addEventListener("click", async() => {
    
//     console.log("we are here")
    
//     try{
//         async () => {

//             let req = await fetch(`https://api.scryfall.com/cards/named?exact=${input}`);
//                 let res = await req.json();
//                 let resBody = res;
            
//                 let details = {
//                     cardName: resBody.name,
//                     type: resBody.type_line,
//                     cmc: resBody.mana_cost,
//                     description: resBody.oracle_text
//                 }
                
                
//                 document.querySelector(".card").innerHTML=`<p>${type}</p>`
//                 console.log(details);
//                 console.log(input);
//         }
            
//     } catch (error) {
//         console.log(error);
//     }
// })
