
export default function generateRandom(maxLimit:number) {
    let rand = Math.random() * maxLimit;
    let random = Math.floor(rand); // 99
    console.log(random); // say 99.81321410836433
    return random;
}