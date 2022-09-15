import { atom, atomFamily, selectorFamily } from "recoil"

export const fakeAtomFamily = atomFamily<any, any>({
  key: `fakeAtomFamily`,
  default: [],
})

export const fakeSelectorFamily = selectorFamily<any, any>({
  key: `fakeSelectorFamily`,
  get: () => () => {},
})

export const undefinedData = atom({
  key: `undefinedData`,
  default: undefined,
})

export const setExampleState = atom({
  key: `setExample`,
  default: new Set(),
})

export const mapExampleState = atom({
  key: `mapExample`,
  default: new Map(),
})

export const fakeState = atom({
  key: `fakeData`,
  default: {
    nestedSet: new Set([`one`, `one`, `two`, `three`]),
    nestedFriends: [
      {
        id: 0,
        name: `Pope Mitchell`,
        map: new Map([
          [`country`, `Chile`],
          [`name`, `Tom`],
        ]),
      },
      {
        id: 1,
        name: `Rosie Hoover`,
        mutuals: [
          {
            id: 75,
            name: `Pope Mitchell`,
            nested: {
              _id: `6305c9831b721d14494841d2`,
              index: 0,
              guid: `dbaabfb2-e550-4f7b-8e28-fe910000ddbb`,
              isActive: true,
              balance: `$3,731.84`,
              picture: `http://placehold.it/32x32`,
              age: 39,
              eyeColor: `brown`,
              name: `Pena Velazquez`,
              gender: `male`,
              company: `LOTRON`,
              email: `penavelazquez@lotron.com`,
              phone: `+1 (998) 528-3826`,
              address: `287 Amber Street, Hampstead, Arkansas, 2678`,
              about: `Dolore minim anim`,
              latitude: -46.260756,
              longitude: -66.552275,
              tags: [
                `anim`,
                `esse`,
                `enim`,
                `aliqua`,
                555,
                `adipisicing`,
                `adipisicing`,
              ],
              greeting: `Hello, Pena Velazquez! You have 4 unread messages.`,
              favoriteFruit: `banana`,
              nestedSet: new Set([`one`, `one`, `two`, `three`]),
              nestedObject: {
                nestedKey: `nestedValue`,
                newItem: null,
              },
              friends: [
                {
                  id: 0,
                  name: `Pope Mitchell`,
                  map: new Map([
                    [`country`, `Chile`],
                    [`name`, `Tom`],
                  ]),
                },
                {
                  id: 1,
                  name: `Rosie Hoover`,
                  mutuals: [
                    {
                      id: 75,
                      name: `Pope Mitchell`,
                      nested: {
                        nestedSet: new Set([`one`, `one`, `two`, `three`]),
                        nestedObject: {
                          nestedKey: `nestedValue`,
                          newItem: null,
                        },
                        friends: [
                          {
                            id: 0,
                            name: `Pope Mitchell`,
                            map: new Map([
                              [`country`, `Chile`],
                              [`name`, `Tom`],
                            ]),
                          },
                          {
                            id: 1,
                            name: `Rosie Hoover`,
                            mutuals: [
                              {
                                id: 75,
                                name: `Pope Mitchell`,
                              },
                            ],
                          },
                          {
                            id: 2,
                            name: `Morton Sykes`,
                          },
                        ],
                      },
                    },
                  ],
                },
                {
                  id: 2,
                  name: `Morton Sykes`,
                },
              ],
            },
          },
        ],
      },
      {
        id: 2,
        name: `Morton Sykes`,
      },
    ],
  },
})

export const fakeUsers = atom({
  key: `fakeUsers`,
  default: [
    {
      id: "63213b4059a5cb772fb40bfc",
      email: "karin_delgado@lyria.sale",
      roles: ["owner", "guest"],
      apiKey: "948ed7bd-5407-4ec7-94b1-edfa84d7353b",
      profile: {
        dob: "1988-08-09",
        name: "Karin Delgado",
        about:
          "Do pariatur deserunt do magna. In laboris qui proident minim consectetur anim voluptate magna anim.",
        address: "94 Roosevelt Court, Hilltop, Minnesota",
        company: "Lyria",
        location: {
          lat: -55.485175,
          long: -57.805932,
        },
      },
      username: "karin88",
      createdAt: "2012-08-01T16:43:29.732Z",
      updatedAt: "2012-08-02T16:43:29.732Z",
    },
    {
      id: "63213b40427dd79cd681ad1f",
      email: "sasha_norris@isoswitch.courses",
      roles: ["admin"],
      apiKey: "13d73188-9507-4b81-b3ce-a15aad0e7fe7",
      profile: {
        dob: "1992-06-30",
        name: "Sasha Norris",
        about:
          "Lorem et nisi id culpa sunt excepteur. Voluptate incididunt ut et esse voluptate aliqua esse duis ipsum adipisicing tempor nisi deserunt.",
        address: "100 Cumberland Street, Hoagland, Missouri",
        company: "Isoswitch",
        location: {
          lat: -33.830982,
          long: 85.004045,
        },
      },
      username: "sasha92",
      createdAt: "2012-04-27T09:14:36.627Z",
      updatedAt: "2012-04-28T09:14:36.627Z",
    },
    {
      id: "63213b40f9be6222fd3e950d",
      email: "lori_merrill@zaggles.active",
      roles: ["admin", "owner"],
      apiKey: "218ab05a-ae0d-4540-a818-f3a06c6ff616",
      profile: {
        dob: "1994-06-28",
        name: "Lori Merrill",
        about:
          "Eu exercitation cillum veniam in aliqua nostrud nulla. Cillum aute nisi proident excepteur culpa labore quis.",
        address: "3 Williams Court, Sehili, Arizona",
        company: "Zaggles",
        location: {
          lat: 14.987657,
          long: -172.889469,
        },
      },
      username: "lori94",
      createdAt: "2014-11-26T21:47:19.218Z",
      updatedAt: "2014-11-27T21:47:19.218Z",
    },
    {
      id: "63213b4095679e1dc6a4b391",
      email: "noreen_bauer@eventex.za",
      roles: ["owner", "member"],
      apiKey: "cf490da1-7b3b-47a5-bc7c-decd07cbb544",
      profile: {
        dob: "1988-05-18",
        name: "Noreen Bauer",
        about:
          "Mollit esse excepteur qui eu officia cillum ullamco occaecat deserunt ad ipsum consequat. Et consectetur aute occaecat nulla qui nostrud enim.",
        address: "99 Eagle Street, Longbranch, Michigan",
        company: "Eventex",
        location: {
          lat: -72.072184,
          long: -114.407172,
        },
      },
      username: "noreen88",
      createdAt: "2012-08-09T07:45:23.487Z",
      updatedAt: "2012-08-10T07:45:23.487Z",
    },
    {
      id: "63213b408a445e381b04706e",
      email: "marietta_mccoy@proxsoft.news",
      roles: ["admin", "guest"],
      apiKey: "4030b2fc-9004-413c-9cd6-5c6091ffe48c",
      profile: {
        dob: "1990-01-24",
        name: "Marietta Mccoy",
        about:
          "Nostrud culpa amet magna sint fugiat. Occaecat aliquip tempor do non.",
        address: "4 Oliver Street, Southview, Northern Mariana Islands",
        company: "Proxsoft",
        location: {
          lat: -70.682053,
          long: 119.995476,
        },
      },
      username: "marietta90",
      createdAt: "2011-07-09T01:23:24.850Z",
      updatedAt: "2011-07-10T01:23:24.850Z",
    },
    {
      id: "63213b4066af511d3dfcfb2a",
      email: "wiley_nguyen@datagen.ee",
      roles: ["guest", "admin"],
      apiKey: "f3f2f152-28a8-4f25-bb9d-ba844d85a0a9",
      profile: {
        dob: "1990-05-26",
        name: "Wiley Nguyen",
        about:
          "Nostrud in commodo amet minim fugiat. Amet enim est nostrud elit irure do ex deserunt laborum aliquip incididunt anim.",
        address: "92 Elliott Place, Brenton, Illinois",
        company: "Datagen",
        location: {
          lat: -15.686828,
          long: -5.084395,
        },
      },
      username: "wiley90",
      createdAt: "2011-05-26T16:14:00.845Z",
      updatedAt: "2011-05-27T16:14:00.845Z",
    },
    {
      id: "63213b407e56546b8e511f1d",
      email: "cornelia_andrews@comcur.immo",
      roles: ["admin", "guest"],
      apiKey: "f4010589-1ad7-45ea-ad8a-6563bdae243c",
      profile: {
        dob: "1989-06-28",
        name: "Cornelia Andrews",
        about:
          "Dolor cillum fugiat quis sit. Ad dolor nostrud non non fugiat nulla Lorem minim.",
        address: "7 Stuyvesant Avenue, Nipinnawasee, Delaware",
        company: "Comcur",
        location: {
          lat: -82.358764,
          long: 26.383082,
        },
      },
      username: "cornelia89",
      createdAt: "2010-09-27T07:17:25.873Z",
      updatedAt: "2010-09-28T07:17:25.873Z",
    },
    {
      id: "63213b4059a5cb772fb40bfc",
      email: "karin_delgado@lyria.sale",
      roles: ["owner", "guest"],
      apiKey: "948ed7bd-5407-4ec7-94b1-edfa84d7353b",
      profile: {
        dob: "1988-08-09",
        name: "Karin Delgado",
        about:
          "Do pariatur deserunt do magna. In laboris qui proident minim consectetur anim voluptate magna anim.",
        address: "94 Roosevelt Court, Hilltop, Minnesota",
        company: "Lyria",
        location: {
          lat: -55.485175,
          long: -57.805932,
        },
      },
      username: "karin88",
      createdAt: "2012-08-01T16:43:29.732Z",
      updatedAt: "2012-08-02T16:43:29.732Z",
    },
    {
      id: "63213b40427dd79cd681ad1f",
      email: "sasha_norris@isoswitch.courses",
      roles: ["admin"],
      apiKey: "13d73188-9507-4b81-b3ce-a15aad0e7fe7",
      profile: {
        dob: "1992-06-30",
        name: "Sasha Norris",
        about:
          "Lorem et nisi id culpa sunt excepteur. Voluptate incididunt ut et esse voluptate aliqua esse duis ipsum adipisicing tempor nisi deserunt.",
        address: "100 Cumberland Street, Hoagland, Missouri",
        company: "Isoswitch",
        location: {
          lat: -33.830982,
          long: 85.004045,
        },
      },
      username: "sasha92",
      createdAt: "2012-04-27T09:14:36.627Z",
      updatedAt: "2012-04-28T09:14:36.627Z",
    },
    {
      id: "63213b40f9be6222fd3e950d",
      email: "lori_merrill@zaggles.active",
      roles: ["admin", "owner"],
      apiKey: "218ab05a-ae0d-4540-a818-f3a06c6ff616",
      profile: {
        dob: "1994-06-28",
        name: "Lori Merrill",
        about:
          "Eu exercitation cillum veniam in aliqua nostrud nulla. Cillum aute nisi proident excepteur culpa labore quis.",
        address: "3 Williams Court, Sehili, Arizona",
        company: "Zaggles",
        location: {
          lat: 14.987657,
          long: -172.889469,
        },
      },
      username: "lori94",
      createdAt: "2014-11-26T21:47:19.218Z",
      updatedAt: "2014-11-27T21:47:19.218Z",
    },
    {
      id: "63213b4095679e1dc6a4b391",
      email: "noreen_bauer@eventex.za",
      roles: ["owner", "member"],
      apiKey: "cf490da1-7b3b-47a5-bc7c-decd07cbb544",
      profile: {
        dob: "1988-05-18",
        name: "Noreen Bauer",
        about:
          "Mollit esse excepteur qui eu officia cillum ullamco occaecat deserunt ad ipsum consequat. Et consectetur aute occaecat nulla qui nostrud enim.",
        address: "99 Eagle Street, Longbranch, Michigan",
        company: "Eventex",
        location: {
          lat: -72.072184,
          long: -114.407172,
        },
      },
      username: "noreen88",
      createdAt: "2012-08-09T07:45:23.487Z",
      updatedAt: "2012-08-10T07:45:23.487Z",
    },
    {
      id: "63213b408a445e381b04706e",
      email: "marietta_mccoy@proxsoft.news",
      roles: ["admin", "guest"],
      apiKey: "4030b2fc-9004-413c-9cd6-5c6091ffe48c",
      profile: {
        dob: "1990-01-24",
        name: "Marietta Mccoy",
        about:
          "Nostrud culpa amet magna sint fugiat. Occaecat aliquip tempor do non.",
        address: "4 Oliver Street, Southview, Northern Mariana Islands",
        company: "Proxsoft",
        location: {
          lat: -70.682053,
          long: 119.995476,
        },
      },
      username: "marietta90",
      createdAt: "2011-07-09T01:23:24.850Z",
      updatedAt: "2011-07-10T01:23:24.850Z",
    },
    {
      id: "63213b4066af511d3dfcfb2a",
      email: "wiley_nguyen@datagen.ee",
      roles: ["guest", "admin"],
      apiKey: "f3f2f152-28a8-4f25-bb9d-ba844d85a0a9",
      profile: {
        dob: "1990-05-26",
        name: "Wiley Nguyen",
        about:
          "Nostrud in commodo amet minim fugiat. Amet enim est nostrud elit irure do ex deserunt laborum aliquip incididunt anim.",
        address: "92 Elliott Place, Brenton, Illinois",
        company: "Datagen",
        location: {
          lat: -15.686828,
          long: -5.084395,
        },
      },
      username: "wiley90",
      createdAt: "2011-05-26T16:14:00.845Z",
      updatedAt: "2011-05-27T16:14:00.845Z",
    },
    {
      id: "63213b407e56546b8e511f1d",
      email: "cornelia_andrews@comcur.immo",
      roles: ["admin", "guest"],
      apiKey: "f4010589-1ad7-45ea-ad8a-6563bdae243c",
      profile: {
        dob: "1989-06-28",
        name: "Cornelia Andrews",
        about:
          "Dolor cillum fugiat quis sit. Ad dolor nostrud non non fugiat nulla Lorem minim.",
        address: "7 Stuyvesant Avenue, Nipinnawasee, Delaware",
        company: "Comcur",
        location: {
          lat: -82.358764,
          long: 26.383082,
        },
      },
      username: "cornelia89",
      createdAt: "2010-09-27T07:17:25.873Z",
      updatedAt: "2010-09-28T07:17:25.873Z",
    },
    {
      id: "63213c7501799066e8fd5dba",
      email: "casandra_morton@poochies.tech",
      roles: ["owner", "guest"],
      apiKey: "ecbc269f-e43b-4c05-94b1-b56042cc1f47",
      profile: {
        dob: "1991-08-13",
        name: "Casandra Morton",
        about:
          "Enim officia fugiat enim et labore id laboris occaecat quis ipsum cupidatat excepteur est. Adipisicing excepteur aliqua culpa non officia laborum ea.",
        address: "21 Roebling Street, Manchester, Palau",
        company: "Poochies",
        location: {
          lat: 25.437549,
          long: 33.823114,
        },
      },
      username: "casandra91",
      createdAt: "2013-12-13T22:08:06.346Z",
      updatedAt: "2013-12-14T22:08:06.346Z",
    },
    {
      id: "63213c75178eae464ab97227",
      email: "janice_johns@medcom.ventures",
      roles: ["guest", "admin"],
      apiKey: "fa72c694-c89c-44c6-b10f-105747071c7b",
      profile: {
        dob: "1992-04-22",
        name: "Janice Johns",
        about:
          "Nisi eiusmod veniam et tempor ad eu qui quis. Nisi tempor nisi irure elit nisi consequat exercitation.",
        address: "96 Hutchinson Court, Idledale, California",
        company: "Medcom",
        location: {
          lat: 45.945935,
          long: 88.571884,
        },
      },
      username: "janice92",
      createdAt: "2013-04-16T15:29:43.324Z",
      updatedAt: "2013-04-17T15:29:43.324Z",
    },
    {
      id: "63213c75fa1565f4b7687f6f",
      email: "silva_dalton@ginkogene.at",
      roles: ["guest", "owner"],
      apiKey: "16054b7e-3e6a-4a27-bd52-c3bf153b4ef2",
      profile: {
        dob: "1994-06-09",
        name: "Silva Dalton",
        about:
          "Sit cupidatat anim minim excepteur in aliquip tempor adipisicing ut deserunt ut. Proident pariatur anim commodo culpa laborum ipsum tempor.",
        address: "67 Baughman Place, Orick, District Of Columbia",
        company: "Ginkogene",
        location: {
          lat: 77.189014,
          long: -86.667403,
        },
      },
      username: "silva94",
      createdAt: "2011-05-28T23:11:30.042Z",
      updatedAt: "2011-05-29T23:11:30.042Z",
    },
    {
      id: "63213c75413a44cc342df6fb",
      email: "spencer_whitley@geeketron.gallery",
      roles: ["admin"],
      apiKey: "bdbd749e-7978-468a-8b1f-6e8b9656098f",
      profile: {
        dob: "1989-06-07",
        name: "Spencer Whitley",
        about:
          "Ut do laboris velit tempor ea. Dolore quis voluptate do velit nulla nisi ullamco voluptate.",
        address: "69 Crescent Street, Watrous, Kentucky",
        company: "Geeketron",
        location: {
          lat: -83.584916,
          long: -66.267941,
        },
      },
      username: "spencer89",
      createdAt: "2014-08-01T02:14:46.283Z",
      updatedAt: "2014-08-02T02:14:46.283Z",
    },
    {
      id: "63213c75bd1382edea5c8c35",
      email: "bryant_fry@polaria.beer",
      roles: ["member"],
      apiKey: "0b87eec1-d520-4779-913a-9702bb121a93",
      profile: {
        dob: "1994-07-21",
        name: "Bryant Fry",
        about:
          "Non ipsum incididunt incididunt nostrud eiusmod qui duis tempor sint. Cillum excepteur do non ut nostrud mollit.",
        address: "55 Jackson Court, Mahtowa, Georgia",
        company: "Polaria",
        location: {
          lat: -59.573656,
          long: 105.315399,
        },
      },
      username: "bryant94",
      createdAt: "2010-10-09T17:14:18.508Z",
      updatedAt: "2010-10-10T17:14:18.508Z",
    },
    {
      id: "63213c7512aa0cd2920fb0bf",
      email: "odom_houston@bovis.reviews",
      roles: ["admin", "guest"],
      apiKey: "f4003c3d-5a4b-4c5a-ad43-0c889480dca7",
      profile: {
        dob: "1991-12-01",
        name: "Odom Houston",
        about:
          "Eu cillum laboris cupidatat ullamco sit labore qui ipsum. Nisi excepteur minim enim sunt adipisicing cupidatat esse officia esse deserunt exercitation excepteur irure do.",
        address: "64 Indiana Place, Cumberland, Louisiana",
        company: "Bovis",
        location: {
          lat: -15.800763,
          long: 164.527417,
        },
      },
      username: "odom91",
      createdAt: "2014-01-31T13:33:58.051Z",
      updatedAt: "2014-02-01T13:33:58.051Z",
    },
    {
      id: "63213c75d6f0da0b5a86ec81",
      email: "sondra_golden@cincyr.aq",
      roles: ["admin", "guest"],
      apiKey: "2952ce2c-54f0-4c65-8e8a-f739724129ee",
      profile: {
        dob: "1993-02-25",
        name: "Sondra Golden",
        about:
          "Aliqua exercitation esse anim labore esse cupidatat exercitation. Cupidatat amet consequat ipsum veniam velit labore eiusmod id eiusmod aliqua qui laborum aliquip.",
        address: "60 Division Avenue, Roosevelt, Utah",
        company: "Cincyr",
        location: {
          lat: -38.124067,
          long: -22.944948,
        },
      },
      username: "sondra93",
      createdAt: "2013-09-08T14:01:46.145Z",
      updatedAt: "2013-09-09T14:01:46.145Z",
    },
    {
      id: "63213c7533b5e2965a5602d2",
      email: "greer_king@veraq.saxo",
      roles: ["admin", "member"],
      apiKey: "8d6c1ca0-190a-4c17-92e3-bbdab9c2bd6c",
      profile: {
        dob: "1991-04-19",
        name: "Greer King",
        about:
          "Sit non ea consequat et cupidatat quis duis esse in ex. Consectetur exercitation nisi in do quis eu minim dolor fugiat ad pariatur excepteur.",
        address: "6 Gerritsen Avenue, Nogal, Northern Mariana Islands",
        company: "Veraq",
        location: {
          lat: -25.338435,
          long: 86.685286,
        },
      },
      username: "greer91",
      createdAt: "2011-11-19T23:29:07.791Z",
      updatedAt: "2011-11-20T23:29:07.791Z",
    },
    {
      id: "63213c750511a2978e2939e6",
      email: "juliet_burns@ovium.singles",
      roles: ["guest", "admin"],
      apiKey: "e252fa46-13dd-4ba6-86d9-4a686b7f0fbb",
      profile: {
        dob: "1989-05-11",
        name: "Juliet Burns",
        about:
          "Ad dolore quis mollit duis. Pariatur elit laboris occaecat laboris consectetur duis incididunt dolor enim.",
        address: "29 Dover Street, Sharon, Pennsylvania",
        company: "Ovium",
        location: {
          lat: -88.056406,
          long: -107.731739,
        },
      },
      username: "juliet89",
      createdAt: "2013-01-23T16:16:43.793Z",
      updatedAt: "2013-01-24T16:16:43.793Z",
    },
    {
      id: "63213c755f9e2c34b227295d",
      email: "dianna_robertson@comtest.barclays",
      roles: ["guest", "member"],
      apiKey: "09daf6c4-8e48-4991-8eb0-c1b55d071eb7",
      profile: {
        dob: "1989-12-10",
        name: "Dianna Robertson",
        about:
          "Aute ipsum aute duis adipisicing exercitation pariatur veniam reprehenderit nulla. Proident nulla eu ex tempor elit enim.",
        address: "57 Furman Avenue, Strykersville, Delaware",
        company: "Comtest",
        location: {
          lat: 38.342809,
          long: 85.789446,
        },
      },
      username: "dianna89",
      createdAt: "2012-08-19T13:10:26.370Z",
      updatedAt: "2012-08-20T13:10:26.370Z",
    },
  ],
})
