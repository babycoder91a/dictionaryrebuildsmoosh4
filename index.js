import React, { useState } from "react";
import axios from "axios"; // Import axios for easier API calls

function App() {
  const [word, setWord] = useState(""); // Store user input
  const [definition, setDefinition] = useState(null); // Store word definition
  const [loading, setLoading] = useState(false); // Loading state for fetching data
  const [error, setError] = useState(null); // Error state for handling API errors

  // Replace with your actual API key from SheCodes API
  const API_KEY = "your-api-key-here";

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form submission
    if (!word.trim()) return; // Don't search if the input is empty

    setLoading(true);
    setError(null);
    setDefinition(null);

    try {
      // API call to the SheCodes Dictionary API
      const response = await axios.get(
        `https://api.shecodes.io/dictionary/v1/define?word=${word}&key=${API_KEY}`
      );
      
      // Set the definition from the API response
      setDefinition(response.data);
    } catch (err) {
      setError("Word not found or an error occurred!");
    } finally {
      setLoading(false); // Stop loading after API response
    }
  };

  // Inline CSS styles
  const styles = {
    app: {
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      padding: "40px",
      backgroundColor: "#f0f4f8",
      borderRadius: "10px",
      maxWidth: "600px",
      margin: "0 auto",
    },
    title: {
      color: "#6a4c93", // Purple color for the title
      fontSize: "2.5em",
      marginBottom: "20px",
    },
    searchForm: {
      marginBottom: "20px",
    },
    searchInput: {
      padding: "12px",
      width: "250px",
      borderRadius: "50px",
      border: "2px solid #6a4c93",
      backgroundColor: "#e8e8e8",
      fontSize: "16px",
      outline: "none",
      transition: "0.3s ease",
    },
    searchInputFocus: {
      borderColor: "#4f2c84", // Darker purple on focus
      backgroundColor: "#f1f1f1",
    },
    searchButton: {
      padding: "12px 20px",
      borderRadius: "50px",
      backgroundColor: "#6a4c93", // Purple button
      color: "white",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
      transition: "0.3s ease",
      marginLeft: "10px",
    },
    searchButtonLoading: {
      backgroundColor: "#8c5f99", // Light purple for loading state
    },
    errorMessage: {
      color: "#ff4d4d", // Red for error message
      fontSize: "18px",
      marginTop: "10px",
    },
    results: {
      backgroundColor: "#ffffff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      marginTop: "30px",
    },
    word: {
      fontSize: "2em",
      color: "#4f2c84", // Dark purple for the word
      marginBottom: "10px",
    },
    phonetic: {
      fontStyle: "italic",
      color: "#6a4c93",
    },
    meanings: {
      listStyleType: "none",
      paddingLeft: "0",
      marginTop: "10px",
    },
    meaningItem: {
      backgroundColor: "#e0daf0", // Light purple bubble effect
      padding: "12px",
      marginBottom: "10px",
      borderRadius: "20px",
      color: "#333",
      fontSize: "18px",
      transition: "0.3s ease",
    },
    meaningItemHover: {
      backgroundColor: "#c4a0d4", // Slightly darker purple on hover
    },
    partOfSpeech: {
      fontWeight: "bold",
      color: "#6a4c93",
    },
  };

  return (
    <div style={styles.app}>
      <h1 style={styles.title}>Dictionary App</h1>
      <form onSubmit={handleSearch} style={styles.searchForm}>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)} // Update word input
          placeholder="Enter a word"
          style={styles.searchInput}
          onFocus={(e) => (e.target.style = styles.searchInputFocus)}
        />
        <button
          type="submit"
          style={{
            ...styles.searchButton,
            ...(loading ? styles.searchButtonLoading : {}),
          }}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p style={styles.errorMessage}>{error}</p>} {/* Error message */}
      {definition && definition.definition && (
        <div style={styles.results}>
          <h3 style={styles.word}>{definition.word}</h3>
          {definition.phonetic && <p style={styles.phonetic}>{definition.phonetic}</p>}
          <h4>Meaning:</h4>
          <ul style={styles.meanings}>
            {definition.definition.map((meaning, index) => (
              <li key={index} style={styles.meaningItem}>
                <span style={styles.partOfSpeech}>{meaning.partOfSpeech}:</span> {meaning.definition}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;

