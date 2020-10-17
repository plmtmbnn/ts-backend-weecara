export const Success = (args: any) => {
  // tslint:disable-next-line: prefer-const
  let response: any = {
  message: args.message
  };
  if(args.data){
    response.data = args.data;
  };
  return response;
};

export const Failed = (message: any) => {
  return { message };
};