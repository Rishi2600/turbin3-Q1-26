import wallet from "/home/rishi/.config/solana/dev1.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        let image = await readFile('/mnt/g/nft.jpg')

        let genericImage = createGenericFile(image, 'BananaManNFT')
        // console.log(genericImage)

        let uploadImage = await umi.uploader.upload([genericImage])
        // console.log(uploadImage)

        const [myUri] = ['https://gateway.irys.xyz/8E1oV9MKEtX8zoSSFdPw5SkJQSdN8A3mrsyP6KDqBx66']

        console.log("Your image URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
