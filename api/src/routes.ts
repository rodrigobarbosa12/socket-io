import { Router, Request, Response } from 'express';
import moment from 'moment';
import { setMessageInChat } from './websocket';

const routes = Router();

routes.post('/send-message', async (req: Request, res: Response): Promise<Response> => {
  try {
    const { message, socketId } = req.body;

    setMessageInChat({
      message,
      socketId,
      id: moment().format('YYYY-mm-dd H:mm:ss'),
    });
    return res.send();
  } catch (error) {
    return res.status(400).send(error);
  }
});

export default routes;
