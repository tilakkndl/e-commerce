
type AsyncFunction = (...args: any[]) => Promise<any>;

const catchAsyncGen = (fn: AsyncFunction) => {
  return async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error) {

      throw error;  
    }
  };
};

export default catchAsyncGen;

