import { Program } from "@project-serum/anchor";

export const fetchTweet = async (program: Program, filter: any =[]) => {
    return await program.account.tweet.all(filter);
}

export const filterData = (address: any) => {
    return {
        memcmp: {
            offset: 8,
            bytes: address
        }
    }
}