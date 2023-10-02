const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
        console.log("before entering");
    // Check trigger source, we're interested in post confirmation
    if (event.triggerSource === "PostConfirmation_ConfirmSignUp") {
        console.log("entered the if");
        const userId = event.userName;
        const email = event.request.userAttributes.email;
        
        // Default user profile
        const userProfile = {
            TableName: "User-ufr53dycl5eqtpz65do6camose-dev",  // Your DynamoDB table name
            Item: {
                id: userId,
                email: email,
                points: 0
                // Add other default attributes as necessary
            }
        };

        try {
            // Insert the user profile into DynamoDB
            await dynamoDB.put(userProfile).promise();
            console.log(`User profile created for: ${userId}`);
        } catch (error) {
            console.error(`Error inserting user profile for: ${userId}. Error: ${JSON.stringify(error)}`);
            // Handle the error appropriately. Depending on your setup, you might want to notify an admin or log it to a monitoring system.
            throw error;
        }
    }
    
    // Return event object as is, per Cognito's requirements for the trigger
    return event;
};
