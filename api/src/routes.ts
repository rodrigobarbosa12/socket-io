import { Router, Request, Response } from 'express';
import { setMessageInChat } from './websocket';

const routes = Router();

routes.post('/send-message', async (req: Request, res: Response) => {
    const { message } = req.body;
  
    try {
        console.log(message);
        setMessageInChat(message);
    } catch (error) {
      return res.status(400).send(error);
    }
  });

export default routes;
