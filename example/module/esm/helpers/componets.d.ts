import { FC, ReactNode } from 'react';
interface WrapProps {
    children: ReactNode;
    defer?: boolean;
    loading?: ReactNode;
}
declare const ForceCSR: FC<WrapProps>;
declare const ForceIRR: FC<WrapProps>;
export { ForceCSR, ForceIRR };
