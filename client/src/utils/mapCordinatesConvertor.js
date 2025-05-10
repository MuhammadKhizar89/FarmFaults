export default function convertToDMS(coordinate, type) {
    const absolute = Math.abs(coordinate);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = Math.floor((minutesNotTruncated - minutes) * 60);
    const direction = coordinate >= 0 ? (type === "lat" ? "N" : "E") : (type === "lat" ? "S" : "W");
    return `${degrees}°${minutes}'${seconds}"${direction}`;
}