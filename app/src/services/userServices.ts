import _prisma from "@/lib/prismaClient"
import { hashPassword } from "@/lib/pswdSecurity";
// import { Role } from "@prisma/client";

export const createUser = async (username: string, password: string) => {

  try {

    const hashed = await hashPassword(password);

    const user = await _prisma.user.create({
      data: {
        username,
        password: hashed,
        // role
      }
    });

    return {
      message: 'User created !',
      status: 201,
      user
    };

  } catch (e: any) {
    if (e.code === 'P2002') {
      return {
        message: 'Username already exists !',
        status: 409,
      }
    }
    return {
      message: 'Something went wrong !',
      status: 500,
    }
  }
}

export const getUser = async (username: string) => {

  try {

    const user = await _prisma.user.findUnique({
      where: {
        username
      },
      select: {
        id: true,
        username: true,
        password: true,
        // role: true
      }
    });

    return user;

  } catch(e) {
    return null;
  }

}

export const getUserById = async (id: number) => {

  try {

    const user = await _prisma.user.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        username: true,
        password: true,
        // role: true
      }
    });

    return user;

  } catch(e) {
    return null;
  }

}