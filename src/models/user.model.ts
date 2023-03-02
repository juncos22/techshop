export interface User {
    name: string
    email?: string
    password?: string
}

// Firestore data converter
export const userConverter = {
    toFirestore: (user: User) => {
        return {
            name: user.name,
            email: user.email,
            password: user.password
        };
    },
    fromFirestore: (snapshot: any, options: any): User => {
        const data = snapshot.data(options);
        return { name: data.name, email: data.email, password: data.password }
    }
};