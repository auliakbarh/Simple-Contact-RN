interface IAppEnvironment {
    baseUrl: string
}
export const environment: IAppEnvironment = {
    baseUrl: process.env.EXPO_PUBLIC_BASE_URL as string,
}
