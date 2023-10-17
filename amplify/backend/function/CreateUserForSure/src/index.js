const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const kms = new AWS.KMS();
const crypto = require('crypto');

exports.handler = async (event) => {
    console.log("before entering");
    
    if (event.triggerSource === "PostConfirmation_ConfirmSignUp") {
        console.log("entered the if");
        
        const userId = event.userName;
        const email = event.request.userAttributes.email;
        
        // Encrypt the userId using KMS
        let encryptedUserId;
        try {
            const encryptResponse = await kms.encrypt({
                KeyId: 'd4cb560a-9f3a-49e9-9d27-2a74aed55cff',  // Replace with your KMS key ID
                Plaintext: Buffer.from(userId)
            }).promise();
            
            encryptedUserId = encryptResponse.CiphertextBlob.toString('base64');
        } catch (encryptError) {
            console.error(`Error encrypting userId: ${JSON.stringify(encryptError)}`);
            throw encryptError;
        }
        
        // Hash the email using SHA-256
        const hashedEmail = crypto.createHash('sha256').update(email).digest('hex');
        
        const userProfile = {
            TableName: "User-ufr53dycl5eqtpz65do6camose-dev",
            Item: {
                id: encryptedUserId,
                email: hashedEmail, // Store hashed email
                points: 0
            }
        };

        try {
            await dynamoDB.put(userProfile).promise();
            console.log(`User profile created for: ${userId}`);
        } catch (dbError) {
            console.error(`Error inserting user profile for: ${userId}. Error: ${JSON.stringify(dbError)}`);
            throw dbError;
        }
    }
    
    return event;
};
