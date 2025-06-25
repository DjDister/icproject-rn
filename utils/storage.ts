import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Retrieves an item from storage by key
 * @param key The storage key to retrieve
 * @returns A promise that resolves to the stored value or null if not found
 */
export const getItem = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error(`Error retrieving item with key ${key}:`, error);
    throw error;
  }
};

/**
 * Stores an item in storage with the given key
 * @param key The storage key to use
 * @param value The value to store
 * @returns A promise that resolves when the operation completes
 */
export const setItem = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error storing item with key ${key}:`, error);
    throw error;
  }
};

/**
 * Removes an item from storage by key
 * @param key The storage key to remove
 * @returns A promise that resolves when the operation completes
 */
export const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item with key ${key}:`, error);
    throw error;
  }
};

/**
 * Clears all storage for the app
 * @returns A promise that resolves when the operation completes
 */
export const clearStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing storage:", error);
    throw error;
  }
};
