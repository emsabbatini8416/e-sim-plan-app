import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const fetchUsersAPI = async (query: string) => {
  const response = await fetch(`https://api.example.com/users?query=${query}`);
  const data = await response.json();
  return data;
};

const UserListScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, [searchQuery]);

  const fetchUserData = async () => {
    setRefreshing(true);

    try {
      const users = await fetchUsersAPI(searchQuery);
      setUsers(users);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const renderUserItem = ({ item }) => {
    const handlePostPress = (postId) => {
      Alert.alert('Post', `Opening post ${postId}`);
    };

    return (
      <TouchableOpacity onPress={() => navigation.navigate('UserDetail', { userId: item.id })}>
        <View style={styles.userItem}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
            <Text style={styles.userStats}>
              Posts: {item.posts ? item.posts.length : 0} | Followers:{' '}
              {item.followers ? item.followers.length : 0}
            </Text>
          </View>
        </View>

        <UserPosts posts={item.posts} onPostPress={(id: string) => handlePostPress(id)} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Search users" value={searchQuery} onChangeText={setSearchQuery} />

      <FlatList
        data={users}
        renderItem={renderUserItem}
        refreshing={refreshing}
        onRefresh={fetchUserData}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const UserPosts: React.FC<{
  posts: any[];
  onPostPress: (id: string) => void;
}> = ({ posts, onPostPress }) => {
  return (
    <View>
      {posts.map((post, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onPostPress(post.id)}
          style={{
            padding: 5,
            backgroundColor: '#f0f0f0',
            marginVertical: 2,
          }}
        >
          <Text numberOfLines={1}>{post.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles: any = StyleSheet.create({
  // styles here
});

export default UserListScreen;
