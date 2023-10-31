import prismaClient from "../../prisma";

interface ReceiveRequest {
  description: string;
  value: number;
  type: string;
  date: string;
  user_id: string;
  maturity: string;
  account_type: string;
  status: string;
  observation: string;
}

class CreateReceiveService {
  async execute({ description, type, value, date, user_id, maturity, account_type, status, observation }: ReceiveRequest) {

    if (!user_id) {
      throw new Error("Invalid user");
    }

    const findUser = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      }
    })

    if (type === "receita") {
      await prismaClient.user.update({
        where: {
          id: user_id,
        },
        data: {
          balance: findUser.balance + Number(value)
        }
      })


    } else {
      await prismaClient.user.update({
        where: {
          id: user_id,
        },
        data: {
          balance: findUser.balance - Number(value)
        }
      })
    }


    const newReceive = await prismaClient.receive.create({
      data: {
        description,
        type,
        value,
        date,
        user_id,
        maturity,
        account_type,
        status,
        observation,
        
      }
    })

    return newReceive;


  }
}

export { CreateReceiveService }