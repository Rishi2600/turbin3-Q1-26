import wallet from "/home/rishi/.config/solana/dev1.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { 
    createMetadataAccountV3, 
    CreateMetadataAccountV3InstructionAccounts, 
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args
} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

// Define our Mint address
const mint = publicKey("85yFXxwMQDBAfKSBGkTrREWebCLKvdK1eQmoAWmUJmuW")

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
    try {
        // Start here
        // let accounts: CreateMetadataAccountV3InstructionAccounts = {
        //     ???
        // }
        let accounts: CreateMetadataAccountV3InstructionAccounts = {
            mint: mint,
            mintAuthority: signer,
            payer: signer,
            updateAuthority: keypair.publicKey
        }

        console.log(`the metadata account: ${accounts}`);

        // let data: DataV2Args = {
        //     ???
        // }
        let data: DataV2Args = {
            name: "BananaMan",
            symbol: "BM$",
            uri: "https://gist.githubusercontent.com/Rishi2600/31569fa3bc5cda9dc0a00dbf142185ee/raw/ca15161a6aff623f44c308f0222887ae61ef540b/gistfile1.txt",
            sellerFeeBasisPoints: 10,
            creators: null,
            collection: null,
            uses: null
        }
        console.log(`the on-chain metadata: ${data}`)

        // let args: CreateMetadataAccountV3InstructionArgs = {
        //     ???
        // }
        let args: CreateMetadataAccountV3InstructionArgs = {
            data: data,
            isMutable: false,
            collectionDetails: null
        }
        console.log(`the metadata account arguments: ${args}`)

        // let tx = createMetadataAccountV3(
        //     umi,
        //     {
        //         ...accounts,
        //         ...args
        //     }
        // )

        // let result = await tx.sendAndConfirm(umi);
        // console.log(bs58.encode(result.signature));
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();
