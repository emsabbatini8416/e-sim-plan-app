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

// ISSUE: Missing error handling - API call doesn't check response.ok before parsing JSON
const fetchUsersAPI = async (query: string) => {
  const response = await fetch(`https://api.example.com/users?query=${query}`);
  const data = await response.json();
  return data;
};

// ISSUE: Missing TypeScript types for props - navigation prop is untyped
// ISSUE: No debouncing on searchQuery
const UserListScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // ISSUE: Missing dependency - fetchUserData should be in dependency array or wrapped in useCallback
  // ISSUE: No cleanup function - if component unmounts during fetch, state update will cause memory leak warning
  useEffect(() => {
    fetchUserData();
  }, [searchQuery]);

  // ISSUE: Function should be wrapped in useCallback to prevent recreation on every render
  // ISSUE: setRefreshing(false) only called in try block - if error occurs, refreshing state stays true forever
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

  // ISSUE: renderUserItem recreated on every render - should use useCallback or move outside component
  // ISSUE: handlePostPress recreated for every item render - should be memoized
  // ISSUE: Missing TypeScript types for item parameter
  const renderUserItem = ({ item }) => {
    const handlePostPress = (postId) => {
      Alert.alert('Post', `Opening post ${postId}`);
    };

    // ISSUE: Inline arrow function in onPress 
    // ISSUE: Image component missing loading placeholder
    // ISSUE: Conditional rendering with ternary - could use optional chaining (item.posts?.length ?? 0)
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

        {/* ISSUE: UserPosts re-renders on every parent render - should use React.memo */}
        <UserPosts posts={item.posts} onPostPress={(id: string) => handlePostPress(id)} />
      </TouchableOpacity>
    );
  };

  // ISSUE: TextInput missing debouncing - onChangeText triggers immediately on every keystroke
  // ISSUE: No empty state handling - if users array is empty, shows blank screen
  // ISSUE: No error state UI - if API fails, user sees no feedback
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

// ISSUE: Component not memoized - will re-render even if props haven't changed
// ISSUE: Using 'any[]' type - should use proper TypeScript interface/type
// ISSUE: Using index as key - should use post.id for stable keys, prevents React reconciliation issues
const UserPosts: React.FC<{
  posts: any[];
  onPostPress: (id: string) => void;
}> = ({ posts, onPostPress }) => {
  // ISSUE: Should check if posts exists and is array before mapping
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

// ISSUE: Using 'any' type for styles - should use proper StyleSheet type
const styles: any = StyleSheet.create({
  // styles here
});

export default UserListScreen;
