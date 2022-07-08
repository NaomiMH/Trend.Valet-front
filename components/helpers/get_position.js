export default function Get_Position(string, subString, index) {
    return string.split(subString, index).join(subString).length;
}