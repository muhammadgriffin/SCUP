import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient'; // Assuming you've installed react-native-linear-gradient

export default function LeaderboardScreen({ navigation }) {
    // Dummy data for the leaderboard
    const generateRandomID = (length = 8) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };
    const users = [
        { id: generateRandomID(), points: 250, badge: "Gold" },
        { id: generateRandomID(), points: 200, badge: "Silver" },
        { id: generateRandomID(), points: 150, badge: "Bronze" },
        { id: generateRandomID(), points: 50, badge: "Beginner" },
        // ... add more users as needed
    ];
    

    // Function to get the appropriate icon based on the badge
    const getBadgeIcon = (badge) => {
        switch(badge) {
            case "Gold": return "star";
            case "Silver": return "star-half-o";
            case "Bronze": return "star-o";
            case "Beginner": return "user";
            default: return "user";
        }
    };
    // Function to get the appropriate color based on the badge
    const getBadgeColor = (badge) => {
        switch(badge) {
            case "Gold": return "#FFD700"; // Gold color
            case "Silver": return "#C0C0C0"; // Silver color
            case "Bronze": return "#CD7F32"; // Bronze color
            case "Beginner": return "#A9A9A9"; // Light Gray color
            default: return "#A9A9A9"; // Default to light gray for any other badges
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Leaderboard</Text>
            <ScrollView style={styles.leaderboard}>
                {users.map((user, index) => (
                    <View key={index} style={styles.userRow}>
                        <Text style={styles.userName}>{user.id}</Text>
                        <Text style={styles.userPoints}>{user.points}</Text>
                        <View style={[styles.badge, {backgroundColor: getBadgeColor(user.badge)}]}>
                            <Icon name={getBadgeIcon(user.badge)} size={20} color="#f4f4f8" />
                            <Text style={styles.badgeText}>{user.badge}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.rewardButton} onPress={() => navigation.navigate('RewardsCenter')}>
                <LinearGradient 
                    colors={['#FFD700', '#FFB300']} 
                    style={styles.gradientButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                    <Icon name="gift" size={20} color="#f4f4f8" style={styles.buttonIcon} />
                    <Text style={styles.rewardButtonText}>Go to Rewards Center</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f8',
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        marginBottom: 20,
        color: '#264653',
        alignSelf: 'center'
    },
    leaderboard: {
        marginBottom: 20,
    },
    userRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: '#e5e5e5',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    userName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#264653',
    },
    userPoints: {
        fontSize: 18,
        fontWeight: '600',
        color: '#264653',
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#2a9d8f',
        marginRight: 10,
    },
    badgeText: {
        fontSize: 16,
        marginLeft: 5,
        color: '#f4f4f8',
    },
    rewardButton: {
        marginBottom: 20,
        borderRadius: 15,
        overflow: 'hidden', // This is to ensure the LinearGradient is bounded within the button
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    
    gradientButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        borderRadius: 15,
    },
    
    buttonIcon: {
        marginRight: 10,
    },
    
    rewardButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#f4f4f8',
    },
});
