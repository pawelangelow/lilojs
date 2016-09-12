/*jslint node: true */
'use strict';

module.exports = {
    secretToken: 'thatIsSomethingBadHarry',
    categories: [
        'Homework',
        'Exam',
        'Practice'
    ],
    paging: {
        contests: 30,
        submissions: 10
    },
    baseAddress: '//localhost:3000',
    allowedLanguages: [
        'C',
        'C++',
        'Java'
    ]
};
