const svgList = import.meta.glob('../icons/*.svg')
const svgNames = []
for (const key of Object.keys(svgList)) {
    svgNames.push(key.substring(key.lastIndexOf('/') + 1, key.lastIndexOf('.')))
}
export default svgNames
