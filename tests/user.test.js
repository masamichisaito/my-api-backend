const request = require('supertest');
const app = require('../app');
const { sequelize, User } = require('../models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

beforeEach(async () => {
  await User.destroy({ where: {}, truncate: true, restartIdentity: true });
});

describe('User API ユニットテスト', () => {
  describe('GET /users', () => {
    it('登録済みユーザーを配列で返す', async () => {
      await User.create({ email: 'get@test.com', name: '取得太郎', age: 20, hobby: '野球' });

      const res = await request(app).get('/users');

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(1);
      expect(res.body[0]).toMatchObject({
        email: 'get@test.com',
        name: '取得太郎',
        age: 20,
        hobby: '野球',
      });
    });
  });

  describe('POST /users バリデーション異常系', () => {
    it('email未入力で400', async () => {
      const res = await request(app).post('/users').send({ name: '太郎', age: 20, hobby: '本' });
      expect(res.statusCode).toBe(400);
      expect(res.body.errors).toContain('email は必須です');
    });

    it('email形式不正で400', async () => {
      const res = await request(app).post('/users').send({ email: 'abc', name: '太郎', age: 20 });
      expect(res.statusCode).toBe(400);
      expect(res.body.errors).toContain('正しいメール形式で入力してください');
    });

    it('name空で400', async () => {
      const res = await request(app).post('/users').send({ email: 'a@a.com', name: '', age: 20 });
      expect(res.statusCode).toBe(400);
      expect(res.body.errors).toContain('name は必須です');
    });

    it('age文字列で400', async () => {
      const res = await request(app).post('/users').send({ email: 'a@a.com', name: '太郎', age: 'abc' });
      expect(res.statusCode).toBe(400);
      expect(res.body.errors[0]).toMatch(/age/);
    });

    it('age負の数で400', async () => {
      const res = await request(app).post('/users').send({ email: 'a@a.com', name: '太郎', age: -1 });
      expect(res.statusCode).toBe(400);
      expect(res.body.errors).toContain('age は0以上である必要があります');
    });

    it('email重複で500 or 400', async () => {
      const payload = { email: 'dup@a.com', name: 'A', age: 20 };
      await request(app).post('/users').send(payload);
      const res = await request(app).post('/users').send(payload);
      expect([400, 500]).toContain(res.statusCode);
      expect(res.body.error).toBe('email はすでに登録されています');
    });
  });

  describe('POST /users 正常登録', () => {
    it('バリデーションOKなら登録成功→戻り値確認', async () => {
      const payload = {
        email: 'valid@a.com',
        name: '正太郎',
        age: 30,
        hobby: '登山'
      };

      const res = await request(app).post('/users').send(payload);
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(expect.objectContaining({
        id: expect.any(Number),
        email: 'valid@a.com',
        name: '正太郎',
        age: 30,
        hobby: '登山'
      }));
    });

    it('不要なフィールドが無視される', async () => {
      const payload = {
        email: 'clean@a.com',
        name: '余計フィールド',
        age: 22,
        hobby: '旅',
        isAdmin: true
      };

      const res = await request(app).post('/users').send(payload);
      expect(res.statusCode).toBe(201);
      expect(res.body.isAdmin).toBeUndefined(); // ← モデルに存在しないため
    });
  });

  describe('DELETE /users/:id', () => {
    it('指定したIDのユーザーを削除できる', async () => {
      const newUser = await User.create({
        email: 'test@example.com',
        name: '削除テスト',
        age: 30,
        hobby: '削除'
      });
  
      const res = await request(app).delete(`/users/${newUser.id}`);
  
      expect(res.statusCode).toBe(204);
  
      const check = await User.findByPk(newUser.id);
      expect(check).toBeNull();
    });
  
    it('存在しないIDを指定すると404エラー', async () => {
      const res = await request(app).delete('/users/99999');
      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe('指定されたユーザーが存在しません');
    });
  });
});
