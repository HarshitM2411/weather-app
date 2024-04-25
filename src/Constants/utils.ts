let timerID: any = null;
export const debounce = (funcRef: Function, timer: number) => {
    clearTimeout(timerID);
    timerID = setTimeout(() => {
        funcRef();
    }, timer);
}