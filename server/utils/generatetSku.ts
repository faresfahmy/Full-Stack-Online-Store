
export const generatetSku = (count:number)=>{
    const c = (count+1).toString();
    const residual = 4-c.length;
    return `PROD-${c.padStart(c.length+residual, '0')}`;
}