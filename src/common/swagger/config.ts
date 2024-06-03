import { DocumentBuilder } from '@nestjs/swagger'

export const config = new DocumentBuilder()
  .setTitle('Red Medica Backend')
  .setDescription('This is the documentation for the Red Medica Application')
  .setVersion('0.0.1')
  .addServer('http://localhost:3000/', 'Local environment')
  .setContact(
    'Bryan Portillo',
    'https://bryancloud.dev/',
    'bryanportillodev@gmail.com'
  )
  .addBearerAuth()
  .build()
