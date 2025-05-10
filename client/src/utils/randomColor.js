const getRandomDarkColor = (firstCharacter) => {

    const char = firstCharacter?.toUpperCase();
    const colorMap = {
        A: "#00008B", // dark blue
        B: "#8B0000", // dark red
        C: "#006400", // dark green
        D: "#8B008B", // dark magenta
        E: "#2F4F4F", // dark slate gray
        F: "#556B2F", // dark olive green
        G: "#483D8B", // dark slate blue
        H: "#8B4513", // saddle brown
        I: "#191970", // midnight blue
        J: "#4B0082", // indigo
        K: "#5F9EA0", // cadet blue
        L: "#2E8B57", // sea green
        M: "#800000", // maroon
        N: "#708090", // slate gray
        O: "#6B8E23", // olive drab
        P: "#9932CC", // dark orchid
        Q: "#3CB371", // medium sea green
        R: "#A52A2A", // brown
        S: "#7B68EE", // medium slate blue
        T: "#8B0000", // dark red again
        U: "#000080", // navy
        V: "#B22222", // firebrick
        W: "#228B22", // forest green
        X: "#2F4F4F", // dark slate gray
        Y: "#CD5C5C", // indian red
        Z: "#4B0082", // indigo again
    };
    return colorMap[char] || "#333333";
};
export default getRandomDarkColor;