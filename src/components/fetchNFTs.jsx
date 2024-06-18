export const fetchNFTs = async () => {
    try {
      const response = await fetch('http://localhost:1337/api/collections');
      if (!response.ok) {
        throw new Error('Failed to fetch NFTs');
      }
      const data = await response.json();
      return data.data; // Accessing the 'data' key
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      return [];
    }
  };
  