import { NextApiRequest, NextApiResponse } from "next"

export default (request: NextApiRequest, response: NextApiResponse) => {
    const users = [
        { id: 1, nome: 'Caetano' },
        { id: 2, nome: 'Brendon' },
        { id: 3, nome: 'Rodrigo' },
        { id: 4, nome: 'Maria Clara' },
        { id: 5, nome: 'João Eduardo' }
    ];

    return response.json(users);
}