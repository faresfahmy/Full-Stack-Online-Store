
import { promises as dns } from 'dns';

export const validateEmail = async(email: string): Promise<boolean> => {
  const checkDomain:boolean = await checkDomainMX(email);
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  return emailRegex.test(email.toLowerCase())&&checkDomain;
};

export const checkDomainMX = async (email: string): Promise<boolean> => {
  try {
    const domain = email.split('@')[1];
    if (!domain) return false;
    const mxRecords = await dns.resolveMx(domain);
    return mxRecords && mxRecords.length > 0;
  } catch (error) {
    return false;
  }
};