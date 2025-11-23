import { useState } from "react";
import { advancedUserSearch } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResults([]);
    setPage(1);

    try {
      const data = await advancedUserSearch(username, location, minRepos, 1);
      setResults(data.items);
      setHasMore(data.hasMore);
    } catch (err) {
      setError("Something went wrong or no users found.");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);

    try {
      const data = await advancedUserSearch(username, location, minRepos, nextPage);
      setResults((prev) => [...prev, ...data.items]);
      setHasMore(data.hasMore);
      setPage(nextPage);
    } catch {
      setError("Unable to load more results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">GitHub Advanced User Search</h1>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <input
          type="text"
          placeholder="Username (optional)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />

        <input
          type="text"
          placeholder="Location (e.g., Ghana)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />

        <input
          type="number"
          placeholder="Minimum Repositories"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />

        <button className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800">
          Search
        </button>
      </form>

      {/* Status Messages */}
      <div className="mt-6 text-center">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>

      {/* Display Search Results */}
      <div className="mt-6 space-y-4">
        {results.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-4 p-4 bg-white shadow rounded-lg"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold">{user.login}</h3>
              {user.location && <p className="text-gray-600">{user.location}</p>}
              {user.public_repos !== undefined && (
                <p className="text-gray-600">Repos: {user.public_repos}</p>
              )}
              <a
                href={user.html_url}
                target="_blank"
                className="text-blue-600 underline"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default Search;