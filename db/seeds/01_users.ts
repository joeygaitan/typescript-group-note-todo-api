import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("users").del()
        .then(() => {
            // Inserts seed entries
            return knex("users").insert([
                {first_name: 'sam', last_name:"smith", username: "misterjoe",email:"samsmith@gmail.com",password:"$2b$10$MxhSR9wVimpiCZvZbOBWeOIftq2p2LYcdvQ/pjAG8yg.KcSoiDNeu",age:22,bio:"lorem ipsem blah de dah",gender:"male", personalsecret1:"computer",personalsecret2:"friend",personalsecret3:"charger",colorScheme:"red", payed:false, active: false, friends_can_see_private:true},
                {first_name: 'hank', last_name:"hill", username: "hankhillboy",email:"hankhill@gmail.com",password:"$2b$10$EUTwNBuhmH2f38by9fZ.oOdGMuInwLvrMVZsJCinRC5e8CeWwcZry",age:50,bio:"lorem ipsem blah de dah",gender:"male", personalsecret1:"computer",personalsecret2:"friend",personalsecret3:"charger",colorScheme:"blue", payed:true, active: false, friends_can_see_private:false},
                {first_name: 'alex', last_name:"rodchester", username: "alexMan",email:"alexrodchester@gmail.com",password:"$2b$10$x0NEH/clJBQEq/N7MLt2/uSNjaUiSM8TJkkZMSMmhAy06BGxyzvce",age:21,bio:"lorem ipsem blah de dah",gender:"male", personalsecret1:"computer",personalsecret2:"friend",personalsecret3:"charger",colorScheme:"yellow", payed:true, active: false, friends_can_see_private:true}
            ]);
        });
};
