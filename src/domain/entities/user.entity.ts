export class User {
    constructor(
        public readonly id: string,
        public name : string,
        public email: string,
        public password: string,
        public role: 'estudiante' | 'docente' | 'administrativo',
        public isActive: boolean = true,
        public createAt: Date = new  Date(),


    ) {}
}