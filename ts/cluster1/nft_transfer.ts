import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "/home/rishi/.config/solana/dev1.json"
import { getOrCreateAssociatedTokenAccount, mintTo, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// NFT Mint address
const mint = new PublicKey("FLz8FhZFGgzhFZDLTKFiH1bLWtWfD2tu2eVNUSruthoe");

// Recipient address
const to = new PublicKey("6Vt51N8nGaSPY9fibaLaR3z5kccvhL3HVX3vfhaeLU52");

(async () => {
    try {
        const myATA = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey

        )

        console.log(`my nft ata: ${myATA.address}`)

        //mint the ata with the nft mint
        const mintTx = await mintTo(
            connection,
            keypair,
            mint,
            myATA.address,
            keypair.publicKey,
            1
        )
        console.log(`mint nft to my ata signature: ${mintTx}`)

        const toATA = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            to
        )
        console.log(`ata address of the receiver ${toATA.address}`);

        // Transfer the new NFT to toATA we just created
        const transferSignature = await transfer(
            connection,
            keypair,
            myATA.address,
            toATA.address,
            keypair.publicKey,
            1
        )
        console.log(`NFT transaction signature ${transferSignature}`)
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();