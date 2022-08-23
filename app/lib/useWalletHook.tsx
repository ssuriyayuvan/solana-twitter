import { AnchorProvider, Program } from "@project-serum/anchor";
import { AnchorWallet, useConnection, useWallet, WalletContextState, useAnchorWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";


import idl from "../../target/idl/twitter.json";

const programID = new PublicKey("6HAgSokzJrNgtCHrHGimXDX5YkK2QnsFVkPPQRw13gx9");

export const useWalletHook = () : {
    connection: Connection;
    adapterWalletObj: WalletContextState;
    anchorWalletObj: AnchorWallet | undefined;
    provider: AnchorProvider,
    program: Program
} => {

    const {connection} = useConnection();
    const adapterWalletObj = useWallet();
    const anchorWalletObj = useAnchorWallet();

    const provider = new AnchorProvider(connection, (adapterWalletObj as any), {});
    const program = new Program((idl as any), programID, provider);

    return {
        connection,
        adapterWalletObj,
        anchorWalletObj,
        provider,
        program
    }
}
