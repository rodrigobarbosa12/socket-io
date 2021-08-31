import { Router, Request, Response } from 'express';
import { setMessageInChat } from './websocket';

const routes = Router();

routes.post('/send-message', async (req: Request, res: Response) => {
    const { message, socketId } = req.body;
  
    try {
        console.log(message);
        setMessageInChat({ message, socketId });
        return res.send();
    } catch (error) {
      return res.status(400).send(error);
    }
  });

export default routes;
