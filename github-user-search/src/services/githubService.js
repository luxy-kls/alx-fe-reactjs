import axios from "axios";

// Helper: fetch full user details (needed because search API returns limited info)
const fetchFullUser = async (username) => {
  const res = await axios.get(`https://api.github.com/users/${username}`);
  return res.data;
};

// Advanced Search
export const fetchUserData = async (username, location, minRepos, page) => {
  let query = "";

  if (username) query += `${username} in:login `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos} `;

  const url = `https://api.github.com/search/users?q=${encodeURIComponent(
    query
  )}&page=${page}&per_page=10`;

  const response = await axios.get(url);
  const users = response.data.items;

  // Fetch full details for each user
  const detailedUsers = await Promise.all(
    users.map(async (u) => {
      try {
        return await fetchFullUser(u.login);
      } catch {
        return u;
      }
    })
  );

  return {
    items: detailedUsers,
    hasMore: response.data.total_count > page * 10,
  };
};