// https://stackoverflow.com/questions/61129013/how-to-import-a-file-into-a-react-app-that-uses-create-react-app-as-raw-text
declare module '*.ftl' {
  const value: string;
  export default value;
}
