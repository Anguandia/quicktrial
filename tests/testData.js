exports.test_users = [
    {
        "email" : "user1@mail.com",
        "firstName" : "test1",
        "lastName" : "user1",
        "password" : "user1",
        "address" : "block1, street1, city1",
        "tel": 256775225010,
    },
    {
        "email" : "user2@mail.com",
        "firstName" : "test2",
        "lastName" : "user2",
        "password" : "user2",
        "address" : "block2, street2, city2",
        "tel": 256775225010,
    },
    {
        "email" : "user3@mail.com",
        "firstName" : "test3",
        "lastName" : "user3",
        "password" : "user3",
        "address" : "block3, street3, city3",
        "tel": 256775225010,
    },
    {
        "mail" : "user1@mail.com",
        "firstName" : "test1",
        "lastName" : "user1",
        "password" : "user1",
        "address" : "block1, street1, city1",
        "tel": 256775225010,
    }
];

exports.testLoans = [
    {
        user: 'user1@mail.com',
        amount: 10000,
        tenor: 12
    },
    {
        user: 'user2@mail.com',
        amount: 20000,
        tenor: 8
    },
    {
        user: 'user3@mail.com',
        amount: 20000,
        tenor: 6
    },
    {
        user: 'user4@mail.com',
        amount: 16000,
        tenor: 12
    }
];

exports.test_repayments = [
    {loanId: 1, amount: 5000},
    {loanId: 2, amount: 3000},
    {loanId: 3, amount: 2000}
];
