# Attest to sucessful Assessment completion with CrediFi


Check out [CrediFi](https://credi-fi.vercel.app/) to play the live version.

## How It Works

1. **User Registration**: Users sign in using their own wallet. The chosen wallet is used to sign offchain attestations.

2. **CrediFi Attestation**: Users can attest that they have successfully completed an assesment using the details ```"string Course_Title,uint256 Score,string Percentage,uint256 No_of_Questions,uint256 No_of_Correct_Answers,string Issuer_Name,string Duration,string Outcome"```. 


## Getting Started

To run the RPS project locally:

Ensure that you have Node.js and npm installed before proceeding.

1. Clone the frontend repo:
   ```bash
   git clone [https://github.com/Nworah-Gabriel/CrediFi](https://github.com/Nworah-Gabriel/CrediFi)
   ```
2. Install dependencies:
   ```bash
   cd CrediFi
   yarn install
   ```
3. Set up your .env file with your Alchemy API key (for resolving ENS names).

4. Start the Development Server
   ```bash
   yarn start
   ```
After completing these steps, the CrediFi display will be shown on port 3000.
