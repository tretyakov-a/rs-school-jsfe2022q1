declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.ejs' {
  const value: <T>(data?: T) => string;
  export default value;
}
