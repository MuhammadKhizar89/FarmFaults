const getRandomDarkColor = () => {
    const letters = "012345"; // Limiting to darker values
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 6)]; // Generates darker hex values
    }
    return color;
  };
  
  export default getRandomDarkColor;
  