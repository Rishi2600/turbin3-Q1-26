## Details of my week-2 assignment -

1. We started by creating a solana keypair using the `solana-keygen` command from the Solana CLI
2. Then we basically went to the project we cloned, and moved into the cluster1 dir
3. We basically had to deal with the `spl_init.ts`and the `spl_mint` files.
4. We migrated to the devnet to do this test.

- Acquired the keypair using the `keypair.fromSecretKey` function from the `@solana/web3.js` library.
- Create a Mint account using the `createMint` function from the `@solana/spl-token` library.
- Stored the subsequent mint address.
- Used that mint address to create an ATA for that mint account using the `getOrCreateAssociatedTokenAccount` function.
- used the `mintTo` function to establish a mint to that ATA we created earlier.