/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

const AuthController = () => import('#controllers/auth_controller')
router
  .group(() => {
    router.post('register', [AuthController, 'register'])
  })
  .prefix('/auth')
