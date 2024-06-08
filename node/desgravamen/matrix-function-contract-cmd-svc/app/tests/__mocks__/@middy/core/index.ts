const middy = (handlerBase: any) => {
  return {
    use: (middlewares: any) => {
      return {
        use: (middlewares: any) => {
          return {
            use: (middlewares: any) => {
              return {
                use: (middlewares: any) => {
                  return {
                    use: (middlewares: any) => {
                      return handlerBase
                    },
                  }
                },
              }
            },
          }
        },
      }
    },
  }
}

export default middy;
