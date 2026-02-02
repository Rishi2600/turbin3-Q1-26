import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "/home/rishi/.config/solana/dev1.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("85yFXxwMQDBAfKSBGkTrREWebCLKvdK1eQmoAWmUJmuW");

// Recipient address
const to = new PublicKey("6Vt51N8nGaSPY9fibaLaR3z5kccvhL3HVX3vfhaeLU52");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const myATA = new PublicKey("8F58FWHBB6GGYuZJGg8t5tLAFu3Df7WyszQuithhuSbf");

        // Get the token account of the toWallet address, and if it does not exist, create it
        const toATA = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            to
        )
        console.log(`ata address of the receiver ${toATA.address}`);

        // Transfer the new token to the "toTokenAccount" we just created
        const transferSignature = await transfer(
            connection,
            keypair,
            myATA,
            toATA.address,
            keypair.publicKey,
            100
        )
        console.log(`token transaction signature ${transferSignature}`)
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();