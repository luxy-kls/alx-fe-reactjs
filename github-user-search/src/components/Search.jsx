import { useState } from "react";
import { fetchUserData } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setUser(null);

    try {
      const data = await fetchUserData(username);
      setUser(data);
    } catch (err) {
      setError("Looks like we can't find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "30px auto" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            border: "1px solid #aaa",
            borderRadius: "6px",
          }}
        />
        <button
          type="submit"
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "10px",
            backgroundColor: "black",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {/* Conditional Rendering */}
      <div style={{ marginTop: "20px" }}>
        {loading && <p>Loading...</p>}

        {error && <p style={{ color: "red" }}>{error}</p>}

        {user && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              width="100"
              style={{ borderRadius: "50%" }}
            />
            <h3>{user.name ? user.name : user.login}</h3>
            <a href={user.html_url} target="_blank">
              View GitHub Profile
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;