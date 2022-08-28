import { atom } from 'recoil'

export const fakeState = atom({
  key: 'fakeData',
  default: {
    _id: '6305c9831b721d14494841d2',
    index: 0,
    guid: 'dbaabfb2-e550-4f7b-8e28-fe910000ddbb',
    isActive: true,
    balance: '$3,731.84',
    picture: 'http://placehold.it/32x32',
    age: 39,
    eyeColor: 'brown',
    name: 'Pena Velazquez',
    gender: 'male',
    company: 'LOTRON',
    email: 'penavelazquez@lotron.com',
    phone: '+1 (998) 528-3826',
    address: '287 Amber Street, Hampstead, Arkansas, 2678',
    about: 'Dolore minim anim',
    latitude: -46.260756,
    longitude: -66.552275,
    tags: [
      'anim',
      'esse',
      'enim',
      'aliqua',
      'esse',
      'adipisicing',
      'adipisicing',
    ],
    greeting: 'Hello, Pena Velazquez! You have 4 unread messages.',
    favoriteFruit: 'banana',
    friends: [
      {
        id: 0,
        name: 'Pope Mitchell',
      },
      {
        id: 1,
        name: 'Rosie Hoover',
        mutuals: [
          {
            id: 75,
            name: 'Pope Mitchell',
          },
        ],
      },
      {
        id: 2,
        name: 'Morton Sykes',
      },
    ],
  },
})
