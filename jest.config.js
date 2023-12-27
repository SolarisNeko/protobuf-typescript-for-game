module.exports = {
    roots: [
        "<rootDir>/test"
    ],
    "setupFiles": ["<rootDir>/jest.setup.js"],
    // test 目录下, ${文件名}.test.js|ts 后缀结尾
    // testRegex: 'test/(.+)\\.test\\.(js|ts)$',
    testRegex: 'test/(.+)\\.test\\.(ts)$',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};