import {Request, Response }from 'express'
import { CreateReceiveService } from '../../services/receive/CreateReceiveService'

class CreateReceiveController{
  async handle(request: Request, response:Response){
    const { 
      description, 
      value,
      type,
      date,
      maturity,
      account_type,
      status,
      observation,
     } = request.body;

     const user_id = request.user_id;

    const createReceiveService = new CreateReceiveService();

    const user = await createReceiveService.execute({
      description, 
      value,
      type,
      date,
      maturity,
      account_type,
      status,
      observation,
      user_id,
    })

    return response.json(user);

  }
}

export { CreateReceiveController }