const { Client, Hbar, FileCreateTransaction, FileContentsQuery, TokenNftInfoQuery, NftId, TokenId } = require("@hashgraph/sdk");
require("dotenv").config();

async function main() {

    //Grab your Hedera testnet account ID and private key from your .env file
    const myAccountId = process.env.ACCOUNT_ID;
    const myPrivateKey = process.env.PRIVATE_KEY;
    const myPublicKey = process.env.PUBLIC_KEY;

    


    // If we weren't able to grab it, we should throw a new error
    if (myAccountId == null ||
        myPrivateKey == null ) {
        throw new Error("Environment variables myAccountId and myPrivateKey must be present");
    }



    // Create our connection to the Hedera network
    // The Hedera JS SDK makes this really easy!
    const client = Client.forMainnet();



    client.setOperator(myAccountId, myPrivateKey);
    const public = client.operatorPublicKey;



    console.log(new TokenId(0, 0, 3090078).toString());
    console.log(new NftId(new TokenId(0, 0, 863882), 1).toString());



    const nftInfos = await new TokenNftInfoQuery()
        .setNftId(new NftId(new TokenId(0, 0, 863882), 1))
        .execute(client);

    console.log(nftInfos);

    const res = await (await nftInfos.getReceipt(client));
    console.log(res);
    


}
main();