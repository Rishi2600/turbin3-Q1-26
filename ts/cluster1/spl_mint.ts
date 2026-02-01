import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "/home/rishi/.config/solana/dev1.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("85yFXxwMQDBAfKSBGkTrREWebCLKvdK1eQmoAWmUJmuW");

(async () => {
    try {
        // Create an ATA
        const ata = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey,
        )
        console.log(`Your ata is: ${ata.address.toBase58()}`);
        //Your ata is: 8F58FWHBB6GGYuZJGg8t5tLAFu3Df7WyszQuithhuSbf

        // Mint to ATA
        // const mintTx = ???
        // console.log(`Your mint txid: ${mintTx}`);
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
