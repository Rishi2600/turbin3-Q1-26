import wallet from "/home/rishi/.config/solana/dev1.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, publicKey, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { createMetadataAccountV3 } from "@metaplex-foundation/mpl-token-metadata";
import { fetchMetadataFromSeeds } from "@metaplex-foundation/mpl-token-metadata";
import base58 from "bs58";


// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

//nft mint address
const mint = publicKey("FLz8FhZFGgzhFZDLTKFiH1bLWtWfD2tu2eVNUSruthoe")

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
    //     // Follow this JSON structure
    //     // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const metadataJSON = {
            name: "BananaManNFT",
            symbol: "BM$",
            description: "BA NA NA",
            image: "https://gateway.irys.xyz/8E1oV9MKEtX8zoSSFdPw5SkJQSdN8A3mrsyP6KDqBx66",
            properties: {
                    files: [
                        {
                            uri: "https://gateway.irys.xyz/8E1oV9MKEtX8zoSSFdPw5SkJQSdN8A3mrsyP6KDqBx66",
                            type: "image/jpg"
                        }
                    ]
            }
        };

        const metadataUri = await umi.uploader.uploadJson(metadataJSON)
        console.log(`metadata uri: ${metadataUri}`)

        // const metadata = createMetadataAccountV3(
        //     umi,
        //     {
        //         mint: mint,
        //         mintAuthority: signer,
        //         payer: signer,
        //         updateAuthority: signer,
        //         data: {
        //             name: "BananaMan",
        //             symbol: "BM$",
        //             uri: " https://gateway.irys.xyz/EbsxdG3ExzfKzwtuKm4B9WPVSgNtMg59cZdRt8J9c1x1",
        //             sellerFeeBasisPoints: 0,
        //             creators: null,
        //             collection: null,
        //             uses: null
        //         },
        //         isMutable: false,
        //         collectionDetails: null

        //     }
        // )

        // let result = await metadata.sendAndConfirm(umi)

        // console.log(base58.encode(result.signature));

        // to get the metadata details
        const metadata = await fetchMetadataFromSeeds(umi, { mint: mint });

        console.log(metadata);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
