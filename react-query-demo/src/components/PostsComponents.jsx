import { useQuery } from 'react-query'

const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')

  if (!response.ok) {
    throw new Error('Failed to fetch posts')
  }

  return response.json()
}

function PostsComponent() {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isFetching
  } = useQuery('posts', fetchPosts, {
    staleTime: 5000, // data stays fresh for 5 seconds
    cacheTime: 10000 // cache stays for 10 seconds after unmount
  })

  if (isLoading) {
    return <p>Loading posts...</p>
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  return (
    <div>
      <h2>Posts</h2>

      <button onClick={refetch}>
        Refetch Posts
      </button>

      {isFetching && <p>Updating...</p>}

      <ul>
        {posts.slice(0, 10).map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostsComponent;
