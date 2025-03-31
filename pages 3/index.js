import { useState } from "react";

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");

  const handleSubmit = async () => {
    const response = await fetch("/api/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients }),
    });
    const data = await response.json();
    setRecipe(data.result);
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Smart Handle – Demo</h1>
      <p>Hva har du i kjøleskapet?</p>
      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        rows={4}
        style={{ width: "100%", padding: 10 }}
      />
      <br />
      <button onClick={handleSubmit} style={{ marginTop: 10 }}>
        Foreslå middag
      </button>
      {recipe && (
        <div style={{ marginTop: 30 }}>
          <h3>Forslag:</h3>
          <pre>{recipe}</pre>
        </div>
      )}
    </div>
  );
}