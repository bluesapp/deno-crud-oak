
import { Response, Request, Body } from 'https://deno.land/x/oak/mod.ts';
import { v4 } from "https://deno.land/std/uuid/mod.ts"

interface User {
    id: string;
    name: string;
}

let users: User[] = [{
    id: '1',
    name: 'Rafa'
}, {
    id: '2',
    name: 'Eliana'
}];

export const getUsers = ({ response }: { response: Response }) => {
    response.body = {
        message: 'successful Query',
        users
    }
};

export const getUser = async ({ params, response }: { params: { id: string }, response: Response }) => {

    const userFound = await users.find(user => user.id === params.id);
    if (userFound) {
        response.status = 200;
        response.body = {
            message: 'Se encontró el usuario',
            userFound
        }
    } else {
        response.status = 404;
        response.body = {
            message: 'Usuario no encontrado'
        }
    }
};

export const createUser = async ({ response, request }: { response: Response, request: Request }) => {
    const body: Body = await request.body();

    if (!request.hasBody) {
        response.status = 404;
        response.body = {
            message: 'Body is required'
        }
    } else {
        const newUser: User = body.value
        newUser.id = v4.generate()

        users.push(newUser)

        response.status = 200;
        response.body = {
            message: 'New user created',
            newUser
        }
    }

};

export const deleteUser = ({ params, response }: { params: { id: string }, response: Response }) => {

    // users = users.filter(user => user.id !== params.id);
    users = users.filter((user) => user.id !== params.id);
    response.status = 200;
    response.body = {
        message: 'Usuario eliminado correctamente',
        users
    }
};

export const updateUser = async ({ request, response, params }: { request: Request, response: Response, params: { id: string } }) => {
        const userFound = users.find(user => user.id !== params.id )
        
        if (!userFound) {
            response.status = 404
            response.body = {
                message: 'Usuario no encontrado'
            }
        } else {
            const body = await request.body();
            const updatedUser = body.value;
            users = users.map(user => user.id === params.id ? {...user, ...updatedUser}: user)
            response.status = 200;
            response.body = {
                users
            }

        }
 };