export interface User {
    id?: string
    name: string
    email?: string
    password?: string
}

export interface PaymentMethod {
    id?: string
    cardNumber: string
    nameOnCard: string
    cardCode: number
    address: string
    expireMonth: number
    expireYear: number
    userCard?: User
}
// Firestore data converter
// export const userConverter = {
//     toFirestore: (user: User) => {
//         return {
//             name: user.name,
//             email: user.email,
//             password: user.password
//         };
//     },
//     fromFirestore: (snapshot: any, options: any): User => {
//         const data = snapshot.data(options);
//         return { name: data.name, email: data.email, password: data.password }
//     }
// };