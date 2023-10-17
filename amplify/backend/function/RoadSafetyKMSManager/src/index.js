const AWS = require('aws-sdk');
const kms = new AWS.KMS();

exports.handler = async (event) => {
    try {
        // Extract the encrypted userId from the event body
        const encryptedUserId = event.encryptedUserId;

        // Decrypt the userId using KMS
        const decryptedData = await kms.decrypt({
            CiphertextBlob: Buffer.from(encryptedUserId, 'base64')
        }).promise();

        const decryptedUserId = decryptedData.Plaintext.toString('utf8');

        return {
            statusCode: 200,
            body: JSON.stringify({ userId: decryptedUserId }),
            headers: {
                'Content-Type': 'application/json',
            },
        };
    } catch (error) {
        console.error('Error during decryption:', error);
        return {
            statusCode: 500,
            body: 'Failed to decrypt data',
        };
    }
};
