import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RolesService } from 'src/shared/entities/roles/roles.service';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  private saltOrRound = 10;

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private roleService: RolesService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async createUser(user: User): Promise<User> {
    if (await this.findOne(user.email)) {
      throw new HttpException(
        'This email already exist !',
        HttpStatus.CONFLICT,
      );
    } else {
      const basicRole = await this.roleService.findById(3);
      user.role = basicRole;

      user.password = await bcrypt.hash(user.password, this.saltOrRound);
      return this.usersRepository.save(user);
    }
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneById(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async findOneByAlias(alias: string): Promise<User> {
    return this.usersRepository.findOne(alias);
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ email });
  }

  async updateUser(user: User): Promise<User> {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, this.saltOrRound);
    }
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async initializePassword(user: User): Promise<string> {
    user.password = this.createRandomPassword();
    this.mailerService.sendMail({
      to: user.email,
      from: 'delignyb.pro@gmail.com', // TODO changer pour l'adresse du client lors de la mise en prod
      subject: 'MonitorManager: Your account',
      text: 'Your new account to MonitorManager',
      html: `<b>welcome,</b><p>Here is your login: ${user.email}</p><p>Here is your password: ${user.password}</p><p>Don't forget to change it soon ;)</p><p>Admin<p>`,
    });
    return user.password;
  }

  async sendNewPassword(email: string) {
    const user = await this.findOneByAlias(email);
    const newPassword = this.createRandomPassword();
    user.password = newPassword;
    this.mailerService
      .sendMail({
        to: user.email,
        from: 'delignyb.pro@gmail.com', // TODO changer pour l'adresse du client lors de la mise en prod
        subject: 'MonitorManager: Your password',
        text: 'Forget Password',
        html: `<b>welcome,</b><p>Here is your new password: ${newPassword}</p><p>Don't forget to change it soon ;)</p><p>Admin<p>`,
      })
      .then(res => {
        console.log(res);
        this.updateUser(user);
      })
      .catch(err => {
        console.log(err);
      });
  }

  //const user = await this.decryptToken(request);
  /* async decryptToken(request): Promise<any> {
    const header = request.headers.authorization;
    const userToken = header.slice(7);
    const currentUser = this.jwtService.decode(userToken);
    return currentUser;
  } */

  createRandomPassword(): string {
    let randomPassword = '';
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?@&';
    for (let i = 0; i < 7; i++) {
      randomPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return randomPassword;
  }
}
