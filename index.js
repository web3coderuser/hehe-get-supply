import express from 'express';
import { Connection, PublicKey } from '@solana/web3.js';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';

const app = express();
const port = process.env.PORT || 3000;

const TOKEN_MINT_ADDRESS = 'BreuhVohXX5fv6q41uyb3sojtAuGoGaiAhKBMtcrpump';

async function getTokenSupply(tokenAddress) {
    // Connect to Solana network (use 'mainnet-beta' for production)
    const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

    // Create a PublicKey object for the token mint
    const mintPublicKey = new PublicKey(TOKEN_MINT_ADDRESS);

    // Fetch the token supply
    const token = new Token(connection, mintPublicKey, TOKEN_PROGRAM_ID, null);
    const tokenInfo = await token.getMintInfo();

    // Calculate total supply
    const totalSupply = tokenInfo.supply.toNumber() / Math.pow(10, tokenInfo.decimals);

    return totalSupply;
}

app.get('/api/total', async (req, res) => {
    try {
        const totalSupply = await getTokenSupply(TOKEN_MINT_ADDRESS);
        res.send(totalSupply.toString());
    } catch (error) {
        console.error('Error fetching token supply:', error);
        res.status(500).json({ error: 'Error fetching token supply' });
    }
});

app.get('/api/circulating', async (req, res) => {
    try {
        const totalSupply = await getTokenSupply(TOKEN_MINT_ADDRESS);
        res.send(totalSupply.toString());
    } catch (error) {
        console.error('Error fetching token supply:', error);
        res.status(500).json({ error: 'Error fetching token supply' });
    }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});