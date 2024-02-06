import { Post, Body, Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
constructor(private authService: AuthService) {}

@Post('/signup')
signUp(@Body() SignUpDto: SignUpDto): Promise <{token: string}>{
return this.authService.singUp(SignUpDto)
}

@Get('/login')
login(@Body() loginDto: LoginDto): Promise <{token: string}>{
return this.authService.login(loginDto)
}


}
