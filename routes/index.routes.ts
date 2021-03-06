import { Router } from 'https://deno.land/x/oak/mod.ts';
import * as indexCtrl from '../controllers/index.controllers.ts';

const router:Router = new Router();

router.get('/', ({response})=>{
    response.body = 'Ruta Inicial Denon'
})

router.get('/users', indexCtrl.getUsers);
router.get('/users/:id', indexCtrl.getUser);

router.post('/users', indexCtrl.createUser);
router.delete('/users/:id', indexCtrl.deleteUser)
router.put('/users/:id', indexCtrl.updateUser)

export default router;