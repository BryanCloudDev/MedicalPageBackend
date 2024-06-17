import { DocumentBuilder } from '@nestjs/swagger'

export const config = new DocumentBuilder()
  .setTitle('Red Medica Backend')
  .setDescription('This is the documentation for the Red Medica Application')
  .setVersion('1.0.0')
  .addServer('http://localhost:3000/', 'Local environment')
  .addServer(
    'https://medicalpagebackend-development.up.railway.app/',
    'Development environment'
  )
  .setContact(
    'Bryan Portillo',
    'https://bryancloud.dev/',
    'bryanportillodev@gmail.com'
  )
  .addBearerAuth()
  .build()
