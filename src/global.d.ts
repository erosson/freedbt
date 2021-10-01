// https://stackoverflow.com/questions/61129013/how-to-import-a-file-into-a-react-app-that-uses-create-react-app-as-raw-text
// https://stackoverflow.com/questions/42631645/webpack-import-typescript-module-both-normally-and-as-raw-string
// declare module '!!raw-loader!*' {
// const contents: string;
// export default contents;
// }
// https://github.com/webpack-contrib/raw-loader/issues/56
declare module '!!raw-loader!*'
declare module '*.ftl'
