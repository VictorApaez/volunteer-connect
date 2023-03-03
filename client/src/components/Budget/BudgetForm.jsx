import React, { useEffect, useState } from "react";
import "../../styles/BudgetForm/BudgetForm.css";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";

function BudgetForm() {
  const [categories, setCategories] = useState([
    "Housing",
    "Transportation",
    "Food",
    "Entertainment",
  ]);
  const [budgets, setBudgets] = useState({});
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    console.log(budgets);
  }, [budgets]);

  const handleAddCategory = () => {
    if (newCategory) {
      setCategories([...categories, newCategory]);
      setBudgets({ ...budgets, [newCategory]: 0 }); // add default budget of 0
      setNewCategory("");
    }
  };
  console.log(budgets);

  const handleDeleteCategory = (category) => {
    setCategories(categories.filter((c) => c !== category));
  };

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCategory();
    }
  }

  return (
    <form className="budget-form-container">
      <h2>Budget Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            {category}{" "}
            <div className="budget-form-input-container">
              $
              <input
                type="number"
                name={category}
                value={budgets[category] || ""}
                onChange={(e) =>
                  setBudgets({ ...budgets, [category]: Number(e.target.value) })
                }
                placeholder="Budget"
              />
              <AiOutlineCloseCircle
                className="budget-form-input-icon"
                onClick={() => handleDeleteCategory(category)}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="budget-form-new-category">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
          className="budget-form-new-category-input"
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <div
          type="text"
          className="budget-form-new-category-button"
          onClick={handleAddCategory}
        >
          <AiOutlinePlus />
        </div>
      </div>
      <button className="budget-form-submit" type="submit">
        Submit
      </button>
    </form>
  );
}

export default BudgetForm;
