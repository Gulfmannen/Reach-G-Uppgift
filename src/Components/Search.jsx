import { useState } from "react";
import axios from "axios";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const handleSearch = async () => {
    if (searchTerm.trim() !== "") {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
        );
        setMeals(response.data.meals || []);
        setSelectedMeal(null); // Reset selected meal when performing a new search
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    }
  };

  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search meal..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="meal-container">
          {meals.map((meal) => (
            <div
              key={meal.idMeal}
              className="meal"
              onClick={() => handleMealClick(meal)}
            >
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <div>
                <h3>{meal.strMeal}</h3>
                {selectedMeal && selectedMeal.idMeal === meal.idMeal && (
                  <p>{meal.strInstructions}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
