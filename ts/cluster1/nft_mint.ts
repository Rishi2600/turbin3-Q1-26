import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import wallet from "/home/rishi/.config/solana/dev1.json"
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi);

(async () => {
    let nftTx = createNft(
        umi,
        {
            mint: mint,
            name: "BananaMan",
            uri: "https://gateway.irys.xyz/8E1oV9MKEtX8zoSSFdPw5SkJQSdN8A3mrsyP6KDqBx66",
            sellerFeeBasisPoints: percentAmount(10)
        }  
    )

    console.log(`nftTX: ${nftTx}`)

    let result = await nftTx.sendAndConfirm(umi);
    const signature = base58.encode(result.signature);
    console.log(`nft mint signature ${signature}`);
    
    // console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)

    console.log("nft Mint Address: ", mint.publicKey);
})();