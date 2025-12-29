import bcrypt from 'bcrypt';

export class PasswordHandler {
  static hashPassword(password: string) {
    if (!password) throw new Error('Password is required');
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  static verifyPassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }
}
