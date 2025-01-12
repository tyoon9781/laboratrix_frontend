type SuccessResult<T> = {
    success: true;
    status: number; // 200, 404, ...
    data: T; // generic data
};

type ErrorResult = {
    success: false;
    status: number;
    detail: string; // error message
};

export type ResponseType<T> = SuccessResult<T> | ErrorResult;