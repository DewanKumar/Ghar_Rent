import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Helpers/AuthContext';

const Post = ({ apiEndpoint }) => {
  const [allPosts, setAllPosts] = useState([]);
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        if (response.data.posts) {
          setAllPosts(response.data.posts);
        } else {
          console.error('No posts found in the response:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiEndpoint]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {allPosts.map((post, index) => (
        <div key={index} className="bg-white shadow-md rounded-md overflow-hidden">
          <img
            src={post.images[0]}
            alt={post.Title}
            className="h-48 w-full object-cover cursor-pointer"
            onClick={() => navigate(`/post/${post.pid}`)}
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-blue-600" onClick={() => navigate(`/post/${post.pid}`)}>
              {post.Title}
            </h2>
            <p className="text-gray-600 text-sm mt-2 mb-4">{post.description?.bed} bed | {post.description?.bath} bath | {post.description?.area} sq.ft</p>
            <p className="text-gray-700 text-sm">Price: {post.Price}</p>
            <p className="text-gray-500 text-xs mt-2">Posted on {formatDate(post.createdAt)}</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white" onClick={() => navigate(`/post/${post.pid}`)}>View Details</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
