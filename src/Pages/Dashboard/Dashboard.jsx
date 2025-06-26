import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router";
import Profile from "../../Components/Profile/Profile";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import NoItem from "../../Error/NoItem";
import PromotionalBanner from "../../Components/PromotionalBanner/PromotionalBanner";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalUserRecipes: 0,
    totalUserLikes: 0,
  });
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://recipe-book-server-green.vercel.app/user-dashboard?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setStats(data);
          setRecipes(data.userRecipes || []);
        })
        .catch((err) => console.error("Failed to load stats", err));
    }
  }, [user?.email]);

  // Chart Data
  const recipesByMonth = Array.from({ length: 12 }, (_, i) => {
    const monthName = new Date(0, i).toLocaleString("default", {
      month: "short",
    });
    return {
      month: monthName,
      count: recipes.filter((r) => new Date(r.createdAt).getMonth() === i)
        .length,
    };
  });

  const likeTrend = recipes.map((recipe) => ({
    name: new Date(recipe.createdAt).toLocaleDateString(),
    likes: recipe.likeCount || 0,
  }));

  const recentRecipes = [...recipes]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);
  console.log("Recent Recipes:", recipes);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl text-center font-bold mb-6">📊 User Dashboard</h1>
      <h2 className="text-xl font-bold mb-6 text-center">
        {user?.email
          ? `👤 Welcome, ${user.displayName || "User"}`
          : "🔒 Please log in to view your dashboard"}
      </h2>
  
        <PromotionalBanner></PromotionalBanner>
       <Profile />



      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6">
        <StatCard title="📋 Recipes Added" value={stats.totalUserRecipes} />
        <StatCard title="❤️ Total Likes" value={stats.totalUserLikes} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <ChartCard title="📆 Recipes by Month">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={recipesByMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="📈 Likes Over Time">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={likeTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="likes"
                stroke="#f87171"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Recent Recipes */}
    <div className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-center">
    🆕 Recently Added Recipes
  </h2>

  {recipes.length === 0 ? (
    <div className="">
      <NoItem />
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {recentRecipes.map((recipe) => (
        <div key={recipe._id} className="bg-base-200 p-4 rounded-xl shadow">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-40 object-cover rounded mb-3"
          />
          <h3 className="text-lg font-bold">{recipe.title.trim()}</h3>
          <p className="text-sm text-gray-600">❤️ {recipe.likeCount} Likes</p>
          <p className="text-sm text-gray-500">
            Added on {new Date(recipe.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  )}
</div>


      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/profile-update" className="btn btn-primary">
          ⚙️ Update Profile
        </Link>
         <Link to="/all-recipes" className="btn btn-accent">
          🍜 All Recipes
        </Link>
        <Link to="/add-recipe" className="btn btn-secondary">
          ➕ Add Recipe
        </Link>
        <Link to="/my-recipe" className="btn btn-accent">
          📂 My Recipes
        </Link>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-base-200 p-6 shadow-md rounded-2xl text-center">
    <h2 className="text-xl font-semibold">{title}</h2>
    <p className="text-4xl font-bold mt-2">{value}</p>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white p-4 rounded-xl shadow-md">
    <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
    {children}
  </div>
);

export default UserDashboard;
