export const API_URL = 'https://dogsapi.origamid.dev/json/'

type TLogin = {
    username: string;
    password: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TOKEN_POST = (body: TLogin) => {
    return {
        url: API_URL + 'jwt-auth/v1/token',
        options: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }
    }
}


export const USER_GET = (token: string) => {
    return {
        url: API_URL + 'api/user',
        options: {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token


            }
        }
    }
}