import { BoolResultBack } from "../../BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../BackModel/ErrorBack";

export type OnlyError = (error: MainErrorObjectBack) => void;
export type BoolWithError = (error: MainErrorObjectBack, data: BoolResultBack) => void;


