export default function getQuantities(quantity: number) {
    let quantities: number[] = []
    for (let q = 1; q <= quantity; q++) {
        quantities.push(q)
    }
    return quantities
}