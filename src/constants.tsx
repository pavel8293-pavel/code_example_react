export const adminRole = 'Administrator';

export const organizerRole = 'Organizer';

export const USER_STORAGE_KEY = 'user';

export const userErrors: { [key: number]: string } = {
  0: 'Не определенная ошибка',
  1: 'Пользователь заблокирован',
  2: 'Неверное имя пользователя или пароль',
  3: 'Пользователь с такими данными не существует',
  4: 'Пользователь с такими данными уже зарегистрирован',
  13: 'Ошибка при изменении данных пользователя'
};

export const errorStyleBackgroundColor = { backgroundColor: 'rgba(240, 128, 128, 0.6)' };