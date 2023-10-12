import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, SectionList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function RewardsCenterScreen() {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedReward, setSelectedReward] = React.useState(null);

    const rewards = [
        {
            badge: 'Gold',
            title: 'Exclusive Gold Voucher',
            description: 'Get 50% off on your next purchase!',
            icon: 'star',
        },
        {
            badge: 'Gold',
            title: 'Gold Members Only Event Access',
            description: 'Get exclusive access to members-only events and webinars!',
            icon: 'calendar-check-o',
        },
        {
            badge: 'Silver',
            title: 'Silver Loyalty Card',
            description: 'Earn points 2x faster with the Silver Loyalty Card!',
            icon: 'credit-card',
        },
        {
            badge: 'Silver',
            title: 'Free E-Book',
            description: 'Choose a free e-book from our selected list!',
            icon: 'book',
        },
        {
            badge: 'Bronze',
            title: 'Bronze Shopping Discount',
            description: 'Enjoy a 10% discount on select items!',
            icon: 'shopping-bag',
        },
        {
            badge: 'Bronze',
            title: 'Early Access Sale',
            description: 'Get early access to our seasonal sales!',
            icon: 'bell',
        },
        {
            badge: 'Beginner',
            title: 'Welcome Gift',
            description: 'Claim your welcome gift on your first purchase!',
            icon: 'gift',
        },
        {
            badge: 'Beginner',
            title: 'Beginner Guide',
            description: 'Access our beginner guide and tutorials to get started!',
            icon: 'info-circle',
        },
    ];
    

    const openRewardDetails = (reward) => {
        setSelectedReward(reward);
        setModalVisible(true);
    };

    // Grouping rewards by badge
    const groupedRewards = rewards.reduce((grouped, reward) => {
        (grouped[reward.badge] = grouped[reward.badge] || []).push(reward);
        return grouped;
    }, {});

    const sections = Object.keys(groupedRewards).map(badge => ({
        title: badge,
        data: groupedRewards[badge]
    }));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rewards Center</Text>
            <SectionList
                sections={sections}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.rewardItem} onPress={() => openRewardDetails(item)}>
                        <Icon name={item.icon} size={24} color="#264653" style={styles.rewardIcon} />
                        <Text style={styles.rewardTitle}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.sectionHeader}>{title}</Text>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            {/* Modal for reward details */}
            {selectedReward && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>{selectedReward.title}</Text>
                            <Text style={styles.modalDescription}>{selectedReward.description}</Text>
                            <TouchableOpacity
                                style={styles.claimButton}
                                onPress={() => {
                                    // Logic to claim reward
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={styles.claimButtonText}>Claim</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ECEFF1',
    },
    title: {
        fontSize: 34,
        fontWeight: '700',
        marginBottom: 20,
        color: '#264653',
        alignSelf: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#2a9d8f',
        paddingBottom: 5,
    },
    rewardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5,
    },
    rewardIcon: {
        marginRight: 15,
    },
    rewardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#264653',
        flex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: '85%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#2a9d8f',
        paddingBottom: 5,
    },
    modalDescription: {
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 20,
        color: '#264653',
    },
    claimButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#2a9d8f',
        borderRadius: 10,
    },
    claimButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#f4f4f8',
        marginLeft: 5,
    },
    sectionHeader: {
        fontSize: 22,
        fontWeight: '700',
        marginTop: 15,
        marginBottom: 5,
        color: '#264653',
        backgroundColor: '#ECEFF1',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
});
