import { useState } from "react";

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "Du er en profesjonell kokk. Når brukeren skriver inn ingredienser, skal du foreslå en enkel middag med maks 5 steg, samt 1–2 ekstra ingredienser de kan kjøpe (gjerne tilbudsvarer)."
            },
            {
              role: "user",
              content: `Ingredienser: ${ingredients}`
            }
          ],
          temperature: 0.7,
          max_tokens: 400
        })
      });

      const data = await response.json();
      setRecipe(data.choices[0].message.content);
    } catch (err) {
      setRecipe("Det oppstod en feil. Prøv igjen senere.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-6 text-gray-800">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Smart Handle 🌟</h1>
        <p className="mb-2 text-sm text-gray-600 text-center">
          Skriv inn hva du har i kjøleskapet, så finner vi et middagsforslag.
        </p>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          rows={4}
          placeholder="f.eks. egg, tomat, ost"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
        >
          {loading ? "Laster forslag..." : "Foreslå middag"}
        </button>
      </div>

      {recipe && (
        <div className="mt-6 w-full max-w-md bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">Forslag:</h2>
          <pre className="whitespace-pre-wrap text-sm text-gray-700">{recipe}</pre>
        </div>
      )}
    </div>
  );
}