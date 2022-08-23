import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Twitter } from "../target/types/twitter";

describe("twitter", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Twitter as Program<Twitter>;
  const provider = anchor.AnchorProvider.env()
  let tweetDataAccount = anchor.web3.Keypair.generate();
  
  let otherAccount = anchor.web3.Keypair.generate();
  console.log("tweet account ",tweetDataAccount.publicKey.toString())
  console.log("tweet account ",provider.wallet.publicKey.toString())
  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.sendTweet("Test topic", "Test content").accounts({
      myTweet: tweetDataAccount.publicKey,
      senderOfTweet: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId
    }).signers([tweetDataAccount]).rpc();
    console.log("Your transaction signature", tx);
  });

  it("update tweets", async () => {
    // Add your test here.
    let airdrop = await provider.connection.requestAirdrop(tweetDataAccount.publicKey, 2000000000);
  console.log("airdrop", airdrop)
    // const tx_before = await program.account.tweet.all()
    // for (let i = 0; i < tx_before.length; i++) {
    //   console.log("tx before is", tx_before[i].account.topic)
    // }
    // const update = await program.methods.updateTweet("test topic 2", "test content 2").accounts({
    //   myTweet: tweetDataAccount.publicKey,
    //   author: provider.wallet.publicKey,
    // }).signers([tweetDataAccount]).rpc();
    // console.log("update is", update)
    const update = await program.methods.updateTweet("hello twitter update", "content update").accounts({
        myTweet: "GL945Lk6YAHqAJmd9GJ5FyujGNC1bh5Xs7AVWcCwknTb",
        author: provider.wallet.publicKey,
      }).signers([]).transaction();
      update.feePayer = provider.wallet.publicKey;
      update.recentBlockhash = (await provider.connection.getLatestBlockhash()).blockhash
     let sign = await provider.wallet.signTransaction(update);
      const txId = await provider.connection.sendRawTransaction(sign.serialize());
      let final = await provider.connection.confirmTransaction(txId);
      console.log("final", final);
      console.log("txid", txId);
      // console.log("ipdate", update)
    const tx = await program.account.tweet.fetch("GL945Lk6YAHqAJmd9GJ5FyujGNC1bh5Xs7AVWcCwknTb");
    console.log("tx last", tx)
    // for (let i = 0; i < tx.length; i++) {
    //   console.log("tx after is", tx[i].account.topic)
    // }
    // const tx = await program.methods.sendTweet("Test topic", "Test content").accounts({
    //   myTweet: tweetDataAccount.publicKey,
    //   senderOfTweet: provider.wallet.publicKey,
    //   systemProgram: anchor.web3.SystemProgram.programId
    // }).signers([tweetDataAccount]).rpc();
    // console.log("Your transaction signature", tx);
  });
  
});
